import { View, Text } from 'react-native'
import React from 'react'

const DataNotFound = () => {
  return (
    <View style={{height:100,display:'flex',alignItems:"center"}}>
      <Text style={{textAlign:"center",color:"#160846"}}>Data Not Found</Text>
    </View>
  )
}

export default DataNotFound