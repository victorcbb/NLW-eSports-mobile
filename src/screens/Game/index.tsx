import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native"
import { useNavigation, useRoute }  from "@react-navigation/native"
import { Entypo } from "@expo/vector-icons"
import { useEffect, useState } from 'react'

import { Background } from "../../components/Background"
import { DuoMatch } from "../../components/DuoMatch"
import { GameParams } from "../../@types/mavigation"
import { Heading } from "../../components/Heading"
import { AdCard, AdCardProps } from "../../components/AdCard"
import { THEME } from "../../theme"
import { styles } from './styles'

import logoImg from "../../assets/logo-nlw-esports.png"

export function Game() {
  const [ad, setAd] = useState<AdCardProps[]>([])
  const [discordAdSelected, setDiscordAdSelected] = useState('')
  const route = useRoute()
  const game = route.params as GameParams

  const navigation = useNavigation()

  function handleOpenGame() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.108:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordAdSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.108:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAd(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenGame}>
            <Entypo 
              name="chevron-thin-left" 
              color={THEME.COLORS.CAPTION_300} 
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image 
          source={{uri: game.bannerUrl}} 
          style={styles.cover} 
          resizeMode="cover" 
        />
        <Heading title={game.name} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ad}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <AdCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal={true}
          style={styles.containerList}
          contentContainerStyle={[ad.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios para Duos no momento
            </Text>
          )}
        />

        <DuoMatch 
          visible={discordAdSelected.length > 0} 
          discord={discordAdSelected} 
          onClose={() => setDiscordAdSelected('')}
        />
      </SafeAreaView>
    </Background>
  )
}