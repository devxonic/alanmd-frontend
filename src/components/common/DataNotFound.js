import { View, Text  , Dimensions} from 'react-native'
import React from 'react'


const DataNotFound = () => {
  let height = Dimensions.get('window').height - 100
  return (
    <View style={{height:height,display:'flex', justifyContent :"center"}}>
      <Text style={{textAlign:"center",color:"#18441f"}}>Data Not Found</Text>
    </View>
  )
}



export default DataNotFound