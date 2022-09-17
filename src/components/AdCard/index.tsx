import { GameController } from 'phosphor-react-native'
import { TouchableOpacity, View, Text } from 'react-native'

import { THEME } from '../../theme'
import { AdInfo } from '../AdInfo'
import { styles } from './styles'

export interface AdCardProps {
  id: string
  name: string
  years_playing: number
  use_voice_channel: boolean
  week_days: string[]
  hour_start: string
  hour_end: string
}

interface Props {
  data: AdCardProps
  onConnect: () => void
}

export function AdCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <AdInfo label="Nome" value={data.name} />
      <AdInfo 
        label="Tempo de jogo" 
        value={`${data.years_playing} ${data.years_playing === 1 ? "ano" : "anos"}`} 
      />
      <AdInfo 
        label="Disponibilidade" 
        value={`${data.week_days.length} ${data.week_days.length === 1 ? "dia" : "dias"} \u2022 ${data.hour_start}h-${data.hour_end}h`} 
      />
      <AdInfo 
        label="Chamadas de áudio" 
        value={data.use_voice_channel === true ? "Sim" : "Não"} 
        colorValue={data.use_voice_channel === true ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} 
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>

      </TouchableOpacity>
    </View>
  )
}