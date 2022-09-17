import { Image, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'
import { styles } from './styles'

import logoImg from '../../assets/logo-nlw-esports.png'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, name, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, name, bannerUrl })
  }

  useEffect(() => {
    fetch("http://192.168.0.108:3333/games")
      .then(response => response.json())
      .then(data => setGames(data)
      )
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          contentContainerStyle={styles.contentList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
        />
      </SafeAreaView>
    </Background>
  )
}
