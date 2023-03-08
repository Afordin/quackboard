import React from 'react'
import { Piano } from 'react-piano'
import 'react-piano/dist/styles.css'

const DURATION_UNIT = 0.2
const DEFAULT_NOTE_DURATION = DURATION_UNIT

class PianoRecording extends React.Component {
  static defaultProps = {
    notesRecorded: false,
  }

  state = {
    keysDown: {},
    noteDuration: DEFAULT_NOTE_DURATION,
  }

  onPlayNoteInput = (_midiNumber) => {
    this.setState({
      notesRecorded: false,
    })
  }

  onStopNoteInput = (_midiNumber, { prevActiveNotes }) => {
    if (this.state.notesRecorded === false) {
      this.recordNotes(prevActiveNotes, this.state.noteDuration)
      this.setState({
        notesRecorded: true,
        noteDuration: DEFAULT_NOTE_DURATION,
      })
    }
  }

  recordNotes = (midiNumbers, duration) => {
    if (this.props.recording.mode !== 'RECORDING')
      return

    const newEvents = midiNumbers.map((midiNumber) => {
      return {
        midiNumber,
        time: this.props.recording.currentTime,
        duration,
      }
    })

    this.props.setRecording({
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration,
    })
  }

  render() {
    const { _playNote, _stopNote, _recording, _setRecording, ...pianoProps }
      = this.props

    const { mode, currentEvents } = this.props.recording
    const activeNotes
      = mode === 'PLAYING'
        ? currentEvents.map(event => event.midiNumber)
        : null
    return (
      <div className="">
        <Piano
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={activeNotes}
          {...pianoProps}
        />
      </div>
    )
  }
}

export default PianoRecording
