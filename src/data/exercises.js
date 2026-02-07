// Same grammar target: "estar + gerund" (present progressive)
// Different vocabulary based on lens context
export const exercises = {
  travel: {
    label: 'Travel',
    emoji: '✈️',
    prompt: 'Translate this sentence:',
    sentence: '"I am looking for the train station."',
    answer: 'Estoy buscando la estación de tren.',
    grammar: 'estar + gerund (present progressive)',
    words: ['Estoy', 'buscando', 'la', 'estación', 'de', 'tren', 'el', 'hotel'],
  },
  social: {
    label: 'Social',
    emoji: '💬',
    prompt: 'Translate this sentence:',
    sentence: '"I am looking for my friend\'s house."',
    answer: 'Estoy buscando la casa de mi amigo.',
    grammar: 'estar + gerund (present progressive)',
    words: ['Estoy', 'buscando', 'la', 'casa', 'de', 'mi', 'amigo', 'el'],
  },
  professional: {
    label: 'Professional',
    emoji: '💼',
    prompt: 'Translate this sentence:',
    sentence: '"I am looking for the meeting room."',
    answer: 'Estoy buscando la sala de reuniones.',
    grammar: 'estar + gerund (present progressive)',
    words: ['Estoy', 'buscando', 'la', 'sala', 'de', 'reuniones', 'el', 'oficina'],
  },
}

export const exercisePreview = [
  { icon: '🗣️', label: 'Asking for directions', type: 'Speaking' },
  { icon: '👂', label: 'Understanding replies', type: 'Listening' },
  { icon: '✍️', label: 'Writing an address', type: 'Writing' },
]
