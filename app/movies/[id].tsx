import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Platform, FlatList, ListRenderItemInfo } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails, getMovieTrailer } from '@/services/api'
import { icons } from '@/constants/icons'
import YoutubePlayer from 'react-native-youtube-iframe';


const YouTubeEmbed = () => {
  const { id } = useLocalSearchParams()
  const [trailer, setTrailer] = useState<Trail[]>([]);

  useEffect(() => {
    const getTrailer = async () => {
      const trail = await getMovieTrailer(id as string)
      // const keys = trail.map((item) => item.key);
      setTrailer(trail);
    }
    getTrailer()
    
  }, [])

  console.log(trailer)
  
  if (Platform.OS === 'web') {
    return (
      <View>
        
      </View>
    );
  } else {
    // For mobile platforms - you'd need to import YoutubePlayer here
    // This could be done with a dynamic import or a separate file
    // const YoutubePlayer = require('react-native-youtube-iframe').default;
    return (
      <View className='h-72'>
        <Text className="text-lg text-white font-bold mb-3">Trailers: </Text>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          data={trailer}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }: ListRenderItemInfo<Trail>) => (
            <YoutubePlayer
              height={190}
              width={300}
              videoId={item.key}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={{ height: 210 }} // Set a fixed height for the FlatList
        />
      </View>
    );
  }
};

interface MovieInfoProps{
  label: string,
  value?: string | number | null,
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">
      {label}
    </Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))
  console.log(movie)

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-xl">{movie?.release_date}</Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className='size-4'/>
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} Votes
            </Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
          <View className="flex flex-row justify-between w-3/4">
            <MovieInfo label='Budget' value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000} million`} />
          </View>
          <MovieInfo label='Production Companies' value={movie?.production_companies?.map((g) => g.name).join(' - ') || 'N/A'} />
          <View className="mt-5 mx-auto">
            <YouTubeEmbed />
          </View>
        </View>
        

      </ScrollView>
      <TouchableOpacity className='absolute bottom-16 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor={"#fff"} />
        <Text className='text-white font-semibold text-base'>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails