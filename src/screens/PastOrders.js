import React, {Component} from 'react'
import {View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, BackHandler} from 'react-native'
import { Icon, Text } from 'react-native-ui-kitten'
import firebase from 'firebase'
import moment from 'moment'

let helpOpts = {
    "root":["Test1","Test2","Test3","Test4","Test5","Test6","Test7","Test8"],
    "Test1":["SubTest11", "SubTest12", "SubTest13"],
    "Test4":["SubTest41","SubTest42"],
    "Test8":["SubTest81","SubTest82","SubTest83"]
};

export default class PastOrders extends Component {

    state = {
        orders:[],
        help: {},
        helpOid: 0,
        email: '',
        chooseHelp: false,
        curOpts: helpOpts["root"].slice(),
        showBack: false
    }

    state = {
        orders : {},
        myOrders: {},
        toggle: {},
        restNames: {},
        help: {},
        helpOid: 0,
        email: '',
        chooseHelp: false,
        curOpts: helpOpts["root"].slice(),
        showBack: false
    }

    componentWillMount() {
        BackHandler.addEventListener(
            'pastOrdersBackPress',
            ()=>{
              this.props.navigation.navigate('Orders');
              return true
            })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'pastOrdersBackPress',
            ()=>{
              this.props.navigation.navigate('Orders');
              return true
            })
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'pastOrdersBackPress',
            ()=>{
              this.props.navigation.navigate('Orders');
              return true
            })
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref('orders')
        .on('value', o => {
            firebase.database().ref('help/users')
            .on('value', h => {
                firebase.database().ref('users/'+uid)
                .on('value', u => {
                    let ord = {}
                    let myOrd = {}
                    let hlp = {}
                    let em = ''
                    if(o && o != null && o.val() && o.val() != null) {
                        ord = o.val()
                        let ordKeys = Object.keys(ord);
                        for(let i=0; i<ordKeys.length; i++) {
                            if(!this.state.restNames[ordKeys[i]])
                                firebase.database().ref('restaurants/'+ord[ordKeys[i]].restId).once('value', rest => {
                                    if(rest && rest != null && rest.val() && rest.val() != null) {
                                        let rn = this.state.restNames
                                        rn[ordKeys[i]] = rest.val().name
                                        this.setState({ restNames: rn })
                                    }
                                })
                        }
                    }
                    if(u.val() && u != null && u.val() && u.val() != null)
                    {
                        em = u.val().email
                        if(u.val().myOrders && u.val().myOrders != null)
                            myOrd = u.val().myOrders
                            console.log("Dwwdw", myOrd)
                        if(u.val().currentOrdId && myOrd[u.val().currentOrdId])
                            delete myOrd[u.val().currentOrdId]
                        
                            console.log("Dwwdw11111", myOrd)
                    }
                    if(h && h != null && h.val() && h.val() != null)
                        hlp = h.val()
                    this.setState({ orders: ord, myOrders: myOrd, help: hlp, email: em }, () => {
                        let oids = Object.keys(this.state.myOrders)
                        let temp = this.state.toggle
                        for(let i=oids.length-1; i>=0; i--) {
                            if(!temp[oids[i]])
                                temp[oids[i]] = false
                        }
                        this.setState({ toggle: temp })
                    })
                });
            });
        });
    }

    toggle(oid) {
        let temp = this.state.toggle
        if(temp[oid])
            temp[oid] = false
        else
            temp[oid] = true
        this.setState({ toggle: temp })
    }

    helpActive(oid) {
        let ord_help_id = this.state.orders[oid].userHelpId
        if(!ord_help_id)
            return false
        if(this.state.help[ord_help_id].status == 1)
            return false
        return true
    }

    helpButtonAction(oid) {
        if(!this.helpActive(oid))
            this.setState({ chooseHelp: true, helpOid: oid, curOpts: helpOpts['root'].slice(), showBack: false })
        else {
            let temp = {}
            temp['help/users/'+this.state.orders[oid].userHelpId] = {}
            temp['orders/'+oid+'/userHelpId'] = {}
    
            firebase.database().ref().update(temp)
            this.setState({ curOpts: helpOpts['root'].slice(), showBack: false })
        }
    }
    
    onHelpPress(opt) {
        let temp = {}

        let helpId = 'help_'+moment().valueOf()
        let helpObj = {
            ordId: this.state.helpOid,
            srcId: this.state.email,
            status: 0,
            issue: opt,
            comment: '',
            log: ''
        }

        temp['help/users/'+helpId] = helpObj
        temp['orders/'+this.state.helpOid+'/userHelpId'] = helpId

        firebase.database().ref().update(temp)
        this.setState({ chooseHelp: false })
    }

    formTime(time) {
        if(time == '')
          return '-:-'
        let at = moment(time)
        return at.hour()+":"+at.minute()
    }

    formDate(date) {
        if(date == '')
          return '-/-/-'
        let at = moment(date)
        return at.date()+"/"+at.month()+"/"+at.year()
    }

    foodItems(order) {
        let foodItems = []
        let names = Object.keys(order.items)
        for(let i=0; i < names.length; i++) {
            foodItems.push(
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 12 }}>{order.items[names[i]].title}</Text>
                    <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10 }}>x{order.items[names[i]].quantity}</Text>
                </View>
            )
        }
        return foodItems
    }

    showComment(oid, order) {
        if(this.state.toggle[oid] && this.helpActive(oid)) {
            let ord_help_id = this.state.orders[oid].userHelpId
            let com = this.state.help[ord_help_id].comment
            return (
                <View style={{width:'85%', marginTop: '2%', borderRadius: 20, elevation: 5, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: this.helpActive(oid)?'#FFFACD':'#fdfdfd' }} >
                    <Text style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: 12 }}>Comments</Text>
                    <Text style={{ fontSize: 12, lineHeight: 15 }}>{com == ''?'Your concern is raised, we will connect with you shortly!':com}</Text>
                </View>
            )
        }
    }

    showInfo(oid, order) {
        if(this.state.toggle[oid]) {
            return (
                <View style={{width:'85%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 5, padding: 12, backgroundColor: this.helpActive(oid)?'#FFFACD':'#fdfdfd' }} >
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: 12 }}>Item</Text>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10, fontFamily: 'serif'}}>Qty</Text>
                    </View>
                    {this.foodItems(order)}
                </View>
            )
        }
    }

    orderCard(oid, order) {
        return (
        <View style={{ width:'100%', flexDirection:'row', marginTop: '2%', marginBottom: '2%' }} >

            <View style={{width:'90%', height:'100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity style={{borderWidth: 1, borderColor: this.helpActive(oid)?'#FADA5E':order.status==3?'#ff7f7f':'#55C2FF', width:'95%', height: 80, borderRadius:20, elevation: 5, padding: 12, backgroundColor: this.helpActive(oid)?'#FFFACD':'#fdfdfd' }}
                    onPress={this.toggle.bind(this, oid)}
                >
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 11, right: 5}}>{this.formDate(parseFloat(oid.split("_")[1]))}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 12, fontFamily: 'serif', fontWeight: 'bold' }}>{this.state.restNames[oid]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 12 }}>Id#: {oid.split("_")[1]}</Text>
                        <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10}}>Arrival: {this.formTime(parseFloat(oid.split("_")[1]))}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }}>Total: {order.totalPrice}/-</Text>
                        <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10}}>Ordered: {this.formTime(order.ordTime)}</Text>
                    </View>
                </TouchableOpacity>
                {this.showInfo(oid, order)}
                {this.showComment(oid, order)}
            </View>

            <View style={{ width: '5%', height: 80, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.helpButtonAction(oid)} style={{ marginBottom: -8}}>
                    <Icon name={this.helpActive(oid)?'undo-outline':'people'} width={28} height={28} tintColor={this.helpActive(oid)?'#FADA5E':'#55C2FF'} />
                    <Text style={{marginLeft: 3, fontSize: 8, fontFamily: 'serif', fontWeight: 'bold', color: '#55C2FF'}}>{this.helpActive(oid)?'':'HELP'}</Text>
                </TouchableOpacity>
            </View>

        </View>
        )
    }

    renderOptions()
    {
        let renderArray = []

        for(let i=0; i<this.state.curOpts.length; i++)
                renderArray.push(
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 25, margin: 5 }}
                        onPress={() => !helpOpts[this.state.curOpts[i]]?this.onHelpPress(this.state.curOpts[i]):this.setState({curOpts: helpOpts[this.state.curOpts[i]].slice(), showBack: true})}
                    >
                        <Text style={{ padding: 7, color: '#555'}}>{this.state.curOpts[i]}</Text>
                    </TouchableOpacity>
                )

        return renderArray
    }

    renderItems()
    {
        let renderArray = [];
        let oids = []
        if(this.state.myOrders)
            oids = Object.keys(this.state.myOrders)
        for(let i=0; i<oids.length; i++)
            if(this.state.orders 
                && this.state.orders!==null 
                && this.state.orders[oids[i]]
                && this.state.orders[oids[i]]!==null)
                        renderArray.unshift(this.orderCard(oids[i], this.state.orders[oids[i]]))
        return renderArray
    }

    header() {
        return (
            <View style={{backgroundColor: '#55C2FF', borderLeftColor: '#A6E7F9', borderLeftWidth: 15, borderBottomColor: '#A6E7F9', borderBottomWidth: 7, borderBottomLeftRadius: 40, flexDirection:'row'}}>
                <Text
                numberOfLines={1}
                style={{
                    fontSize: 19,
                    color: '#fdfdfd',
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    margin: '3%',
                    marginLeft: '5%'
                }}>
                Past Orders
                </Text>
          </View>
        )
    }

    render()
    {
        if(Object.keys(this.state.restNames).length != Object.keys(this.state.orders).length)
            return (
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ActivityIndicator size='large' color='#55C2FF' style={{ marginTop: '100%' }} />
                </View>
            )
        return (
        <View>
            <Modal
                transparent={true}
                visible={this.state.chooseHelp}
                onRequestClose={() => this.setState({ chooseHelp: false, curOpts: helpOpts['root'].slice(), showBack: false })}
            >
                <View style={{ flex: 1, backgroundColor: '#77777750' }}>
                    <View style={{
                        height: '40%',width: '80%', backgroundColor: '#fdfdfd', marginTop: '50%',
                        alignSelf: 'center', borderRadius: 10, elevation: 10
                        }}>
                        <TouchableOpacity onPress={() => this.state.showBack?this.setState({ curOpts: helpOpts['root'].slice(), showBack: false }):this.setState({ chooseHelp: false, showBack: false })}>
                            <Text style={{ textAlign: 'right', marginTop: 7, marginRight: 10, fontSize: 22, color: '#bcbcbc'}}>{this.state.showBack?'<':'x'}</Text>
                        </TouchableOpacity>
                        <View style={{ height: '250%', borderRadius: 10 }}>
                            <ScrollView style={{height: '100%', borderRadius: 10 }}>
                                {this.renderOptions()}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
            {this.header()}
            <View style={{ height: '100%', width: '100%', paddingTop: '2%'}}>
                <ScrollView>
                    {this.renderItems()}
                </ScrollView>
            </View>
        </View>
        );
    }
}
