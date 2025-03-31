import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({ focused, icon, name }: any) => {
    if (focused) {
        return (
          <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[112px] min-h-[4rem] mt-3 justify-center items-center rounded-full overflow-hidden"
          >
            <Image source={icon} tintColor="#151312" className="size-5" />
            <Text className="text-secondary text-base font-semibold ml-2">
              {name}
            </Text>
          </ImageBackground>
        );
      }
    
      return (
        <View className="size-full justify-center items-center mt-3 rounded-full">
          <Image source={icon} tintColor="#A8B5DB" className="size-5" />
        </View>
      );
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 34,
          height: 49,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon focused={focused} icon={icons.home} name={"Home"} />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='search'
            options={{
                headerShown: false,
                title: "Search",
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon focused={focused} icon={icons.search} name={"Search"} />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='saved'
            options={{
                headerShown: false,
                title: "Saved",
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon focused={focused} icon={icons.save} name={"Saved"} />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                headerShown: false,
                title: "Profile",
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon focused={focused} icon={icons.person} name={"Profile"} />
                    </>
                )
            }}
        />
    </Tabs>
  )
}

export default _layout