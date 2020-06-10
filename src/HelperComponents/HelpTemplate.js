import React from 'react'
import { TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import firebase from 'firebase';
import moment from 'moment';

/*let helpOpts = {
    "root":["Test1","Test2","Test3","Test4","Test5","Test6","Test7","Test8"],
    "Test1":["SubTest11", "SubTest12", "SubTest13"],
    "Test4":["SubTest41","SubTest42"],
    "Test8":["SubTest81","SubTest82","SubTest83"]
};*/

export default class HelpTemplate extends React.Component {

    state = {
        orders : {},
        toggle: {},
        help: {},
        curStatus: 0,
        editElement: '',
        editText: '',
        //helphid: 0,
        //chooseHelp: false,
        //curOpts: helpOpts["root"].slice(),
        //showBack: false
    }

    componentDidMount() {
        firebase.database().ref('orders')
        .on('value', o => {
            firebase.database().ref('help/'+this.props.helpNode)
            .on('value', h => {
                    let ord = {}
                    let hlp = {}
                    if(o && o != null && o.val() != null)
                        ord = o.val()
                    if(h && h != null && h.val() != null)
                        hlp = h.val()
                    this.setState({ orders: ord, help: hlp }, () => {
                        let hids = Object.keys(this.state.help)
                        let temp = this.state.toggle
                        for(let i=hids.length-1; i>=0; i--) {
                            if(!temp[hids[i]])
                                temp[hids[i]] = false
                        }
                        this.setState({ toggle: temp })
                    })
            });
        });
    }

    toggle(hid) {
        let temp = this.state.toggle
        if(temp[hid])
            temp[hid] = false
        else
            temp[hid] = true
        this.setState({ toggle: temp })
    }

    resolve(hid) {
        let hlp = this.state.help
        let stat = 0
        if(hlp[hid].status==0)
            stat = 1

        let temp = {}
        temp['help/'+this.props.helpNode+'/'+hid+'/status'] = stat
        firebase.database().ref().update(temp)
    }
    
    delete(hid, oid) {
        let temp = {}
        temp['help/'+this.props.helpNode+'/'+hid+'/status'] = 1
        temp['orders/'+oid+'/status'] = 4
        firebase.database().ref().update(temp)
    }

    formTime(time) {
        if(time == '')
          return '-:-'
        let at = moment.unix(time)
        return at.hour()+":"+at.minute()
    }

    formDate(date) {
        if(date == '')
          return '-/-/-'
        let at = moment.unix(date)
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

    showInfo(hid, oid) {
        let order = this.state.orders[oid]
        let help = this.state.help[hid]
        if(this.state.toggle[hid]) {
            return (
                <View style={{width:'85%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 5, padding: 12, backgroundColor: '#fdfdfd' }} >
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: 12 }}>Item</Text>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10, fontFamily: 'serif'}}>Qty</Text>
                    </View>
                    {this.foodItems(order)}
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: 12 }}>{'\n'}Total: </Text>
                        <Text style={{ fontSize: 12 }}>{'\n'}{order.totalPrice}/-</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Comment"
                            placeholderTextColor='#555'
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.input}
                            returnKeyType="go"
                            onFocus={() => this.setState({ editElement: hid+'_com', editText: help.comment })}
                            onBlur={() => {
                                firebase.database().ref('help/'+this.props.helpNode+'/'+hid).update({ comment: this.state.editText })
                                this.setState({ editElement: '', editText: '' })
                            }}
                            value={this.state.editElement == hid+'_com'?this.state.editText:help.comment}
                            onChangeText={com => this.setState({ editText: com })}
                        />
                        <TextInput
                            placeholder="Log"
                            placeholderTextColor='#555'
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.input}
                            returnKeyType="go"
                            onFocus={() => this.setState({ editElement: hid+'_log', editText: help.log })}
                            onBlur={() => {
                                firebase.database().ref('help/'+this.props.helpNode+'/'+hid).update({ log: this.state.editText })
                                this.setState({ editElement: '', editText: '' })
                            }}
                            value={this.state.editElement == hid+'_log'?this.state.editText:help.log}
                            onChangeText={log => this.setState({ editText: log })}
                        />
                    </View>
                </View>
            )
        }
    }

    helpCard(hid, help) {
        return (
        <View style={{ width:'100%', flexDirection:'row', marginBottom: '4%' }} >
            <View style={{width:'90%', height:'100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity style={{borderWidth: 1, borderColor: '#bcbcbc', width:'95%', height: 110, borderRadius:20, elevation: 5, padding: 12, backgroundColor: '#fdfdfd' }}
                    onPress={this.toggle.bind(this, hid)}
                >
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 11, right: 5}}>{this.formDate(parseFloat(hid.split("_")[1]))+' ~ '+this.formTime(parseFloat(hid.split("_")[1]))}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '2%'}}>
                        <Text style={{ fontSize: 12, fontFamily: 'serif', fontWeight: 'bold' }}>{help.issue}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 12 }}>HelpId#: {hid.split("_")[1]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{ fontSize: 12 }}>OrderId#: {help.ordId.split("_")[1]}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }}>Source email: {help.srcId}</Text>
                    </View>
                </TouchableOpacity>
                {this.showInfo(hid, help.ordId)}
            </View>

            <View style={{ width: '5%', height: 110, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.delete(hid, help.ordId)} style={{ marginBottom: '50%'}}>
                    <Icon name='trash-outline' width={25} height={25} tintColor='#ff7f7f' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.resolve.bind(this, hid)} style={{ marginTop: '50%'}}>
                    <Icon name={help.status==0?'checkmark-circle-2-outline':'close-circle-outline'} width={27} height={27} tintColor={help.status==0?'#5dbb63':'#ff7f7f'} />
                </TouchableOpacity>
            </View>

        </View>
        )
    }

    /*renderOptions()
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
    }*/

    renderItems()
    {
        let renderArray = [];
        let hids = []
        if(this.state.help)
            hids = Object.keys(this.state.help)
        for(let i=0; i<hids.length; i++)
            if(this.state.help
                && this.state.help!==null 
                && this.state.help[hids[i]]
                && this.state.help[hids[i]]!==null
                && this.state.curStatus == this.state.help[hids[i]].status)
                    if(this.state.curStatus == 0)
                        renderArray.push(this.helpCard(hids[i], this.state.help[hids[i]]))
                    else
                        renderArray.unshift(this.helpCard(hids[i], this.state.help[hids[i]]))
        return renderArray
    }

    render()
    {
        return (
        <View>
            {/*<Modal
                animationType="slide"
                transparent={true}
                visible={this.state.chooseHelp}
                onRequestClose={() => this.setState({ chooseHelp: false, curOpts: helpOpts['root'].slice(), showBack: false })}
            >
                <View style={{
                    height: '40%',width: '80%', backgroundColor: '#fdfdfd', marginTop: '50%',
                    alignSelf: 'center', borderRadius: 10, elevation: 10
                    }}>
                    <TouchableOpacity onPress={() => this.state.showBack?this.setState({ curOpts: helpOpts['root'].slice(), showBack: false }):this.setState({ chooseHelp: false, showBack: false })}>
                        <Text style={{ textAlign: 'right', marginTop: 7, marginRight: 10, fontSize: 22, color: '#bcbcbc'}}>{this.state.showBack?'<':'x'}</Text>
                    </TouchableOpacity>
                    <View style={{ height: '250%', borderRadius: 10 }}>
                        <ScrollView style={{height: '100%', borderRadius: 10}}>
                            {this.renderOptions()}
                        </ScrollView>
                    </View>
                </View>
                </Modal>*/}
            <View style={{ flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }}>
                <TouchableOpacity
                    onPress={() => this.state.curStatus == 0?this.setState({ curStatus: 1 }):this.setState({ curStatus: 0 })}
                >
                    <Icon
                        name={this.state.curStatus == 0?'toggle-left-outline':'toggle-right-outline'}
                        width={35} height={35}
                        tintColor={this.state.curStatus == 0?'#bcbcbc':'#55c2ff'}
                    />
                </TouchableOpacity>
                <Text style={{ color: this.state.curStatus == 0?'#777':'#55c2ff', fontSize: 12, fontFamily: 'serif', fontWeight: 'bold', marginTop: '2%' }}> Resolved</Text>
            </View>
            <View style={{ height: '100%', width: '100%', paddingTop: '2%'}}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    {this.renderItems()}
                </ScrollView>
            </View>
        </View>
        );
    }
}

const styles = {
    input: {
      width: '100%',
      backgroundColor: '#ededed',
      fontSize: 12,
      marginTop: '3%',
      borderRadius: 20,
      paddingLeft: 15,
      paddingVertical: 3
    }
}