
export default class Character {
  constructor () {
    this.id = -1
    this.name = ''
    this.role = ''
    this.archetype = ''
    this.symbols = ''
    this.description = ''
    this.values = ''
    this.strengths = ''
    this.weaknesses = ''
    this.desire = ''
    this.plan_to_achieve_desire = ''
    this.need = ''
    this.realization = ''
    this.morale_decision = ''
    this.transformation = {
      general: '',
      sequence: '',
      symbol: ''
    }
  }
}
