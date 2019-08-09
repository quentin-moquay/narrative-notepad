
export default class Scene {
  constructor (id, description, place, order) {
    this.id = id
    this.description = description
    this.place = place
    this.arcPosition = ''
    this.problem = ''
    this.strategy = ''
    this.desire = ''
    this.desirePurpose = ''
    this.characters = []
    this.leader = null
    this.order = order
  }
}
