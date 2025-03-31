import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  place: string;
  press?: () => void; // Optional, type func that returns void
  value: string;
  onChangeText?: (text: string) => void; // Accepts a string argument
}

const SearchBar = ({ place, press, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={'#ab8bff'} />
      <TextInput
        onPress={press}
        placeholder={place}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#ab8bff'}
        className='flex-1 ml-3 text-white'
      />
    </View>
  )
}

export default SearchBar

