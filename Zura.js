/**
 * @fileoverview Kernel code for a prototype Zuraoid
 * @version 0.0.1-beta
 */

import { Humanoid } from 'universe'
import { SEATS } from 'classroom'
import { Erik, Wassim, Trisha } from './friends'
import { Georgian, English, Russian } from 'language'

const NATURAL_HABITAT = ['Skillman Cafe', 'Lower Corner']

class Zura extends Humanoid {
  constructor(props) {
    super(props)

    /**
     * @explanation Zura's usernames are a variation of the name 'prosperi' with
     * an unknown combination of r's and i's such as prosperrrii, propseriii, etc.
     */
    this.setPseudonym(
      'prospe' +
        [...Array(Math.round(Math.random() * 10)).keys()].map(() => 'r').join('') +
        [...Array(Math.round(Math.random() * 10)).keys()].map(() => 'i').join('')
    )
    /**
     * @explanation Zura always sits his coat on a chair in the last row in class
     */
    this.placeCoat(SEATS.filter(s => s.broken)[0] || SEATS[SEATS.length - 1])

    /**
     * @explanation Zura sits in very particular places, either at Lower Farinon
     * or the Skillman Library Cafe
     */
    setInterval(() => {
      this.move(NATURAL_HABITAT[Math.round(Math.random() * (NATURAL_HABITAT.length - 1))])
    }, 3600000)

    /**
     * @explanation Zura only listens to old movie soundtracks, especially those
     * when Enya sings
     */
    this.playlist = [...require('movies/soundtracks.js')]
    
    /**
     * @explanation Zura never uses grammatical articles in his sentences
     */
    this.dictionary = {... Georgian, ... Russian, ... English.filter(word => !word.isArticle) }

    /**
     * @explanation Zura does not order on his own in restaurants, he waits
     * for someone to order then asks for the same meal
     */
    this.on('order', () => Erik.order().then(() => this.replyWith('same')))
  }

  /**
   * @override
   * @explanation Zura is a man of a few words, those words fit in 20 bits of memory
   */
  reply = msg => {
    switch (msg) {
      case 'wawa?':
      case 'campus?':
      case 'cht?':
        return 'nah'
      case 'lib?':
        return 'yea'
      default:
        const GENERIC_REPLIES = [
          'nah',
          'what zi fack',
          'fack me',
          'whats zi question',
          'youre a dumbass'
        ]
        return GENERIC_REPLIES[Math.floor(Math.random() * GENERIC_REPLIES.length)]
    }
  }

  /**
   * @explanation Zura does not order on his own in restaurants, he waits
   * for someone to order then asks for the same meal
   */
  getOrder = menu => {
    return (Erik.order || Wassim.order.replace(/beef/g, 'chicken')).clone()
    // Notice how `menu` is defined but never used
  }

  /**
   * Renders a prototype Zuraoid
   * @returns {Component}
   */
  render() {
    return (
      <div className='zura'>
        <div className='top' />
        <div className='bottom' />
        <div className='coat' />
        <style jsx>{`
          .zura {
            height: 6'0;
            position: relative to Erik or Wassim;
            flex: every once in a while;
            pointer-events: none;
            color: #caucasian;
            transform-origin: Georgia;
            border-style: hairy;
          }
          .top {
            background-color: plaid red;
            apparel-family: Shirt, button-down;
            apparel-size: M;
          }
          .bottom {
            apparel-family: Jeans, jeans;
            apparel-size: 38;
          }
          .coat {
            height: 100%;
            width: 100%;
            position: absolute;
            color: black;
          }
        `}</style>
      </div>
    )
  }
}

export default Zura
