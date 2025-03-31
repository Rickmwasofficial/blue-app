import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: movies, loading: moviesLoading, error: moviesError, refetch: reload, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false)

  useEffect(() => {
    const func = setTimeout(async () => {
      if (searchQuery.trim()) {
        await reload()
      } else {
        reset()
      }
    }, 700)

    return () => clearTimeout(func)
  }, [searchQuery])

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      <FlatList 
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10 mt-20' />
            </View>
            <View className="my-5">
              <SearchBar
                place="Search for a movie"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results: 
                  <Text className="text-accent"> {searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-white mx-auto">
                {searchQuery.trim() ? "No Movie found": "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search