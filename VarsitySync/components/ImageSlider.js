import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions} from 'react-native'
import React from 'react'


import { sliderImages } from '../constants'


const ImageSlider = ({data}) => {
  const {width} = useWindowDimensions();
  const SIZE = width * 0.5;
  return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator= {false}
    bounces= {false}>
      {data.map((item, index) => {
        return (
          <View style= {{width: SIZE, marginVertical: 20}}>
            <View style= {styles.imageContainer}>
              <Image source= {item.image} style= {styles.image}/>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default ImageSlider;

const styles = StyleSheet.create({
  imageContainer : {
    borderRadius: 50,
    marginHorizontal: 10,
    overflow: 'hidden',
    
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  }
})