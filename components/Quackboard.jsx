import { KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'
import React from 'react'
import _ from 'lodash'

import PianoRecording from './PianoRecording'
import DimensionsProvider from './Dimensions.jsx'
import Loader from './Loader'

const noteRange = {
  first: MidiNumbers.fromNote('c4'),
  last: MidiNumbers.fromNote('c5'),
}
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
})
export default class Quackboard extends React.Component {
  state = {
    recording: {
      mode: 'RECORDING',
      events: this.props.song || [],
      currentTime: 0,
      currentEvents: [],
    },
    error: null,
    loading: false,
    modalIsOpen: false,
    disabled: false,
    title: '',
  }

  constructor(props) {
    super(props)

    this.scheduledEvents = []
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  uploadToSupabase = async (events) => {
    const { supabase } = this.props
    this.setState({ loading: true })

    this.setState({ modalIsOpen: true })
    const userData = await (await supabase.auth.getSession()).data.session.user
    const user = userData.id
    const { nickname, picture } = userData.user_metadata
    const { error } = await supabase.from('canciones').insert({
      author: user,
      message: events,
      username: nickname,
      profilePicture: picture,
      title: this.state.title,
    })
    if (error)
      this.setState({ error })

    else
      this.setState({ loading: false })
  }

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0)
      return 0

    return Math.max(
      ...this.state.recording.events.map(event => event.time + event.duration),
    )
  }

  setRecording = (value) => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    })
  }

  setEvents = (value) => {
    this.setState({
      events: Object.assign({}, this.state.recording.currentEvents, value),
    })
  }

  onClickPlay = (events) => {
    this.setRecording({
      mode: 'PLAYING',
      notes: events || [],
    })
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, event => [
        event.time,
        event.time + event.duration,
      ]),
    )
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events?.filter((event) => {
            return event.time <= time && event.time + event.duration > time
          })
          this.setRecording({
            currentEvents,
          })
        }, time * 1000),
      )
    })
    // Stop at the end
    setTimeout(() => {
      this.onClickStop()
    }, this.getRecordingEndTime() * 1000)
  }

  onClickStop = () => {
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent)
    })
    this.setRecording({
      mode: 'RECORDING',
      currentEvents: [],
    })
  }

  onClickClear = () => {
    this.onClickStop()
    this.setRecording({
      events: [],
      mode: 'RECORDING',
      currentEvents: [],
      currentTime: 0,
    })
  }

  componentDidMount() {
    if (this.props.song)
      this.onClickPlay(this.props.song)
  }

  render() {
    return (
      <>
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <PianoRecording
              recording={this.state.recording}
              setRecording={this.setRecording}
              noteRange={noteRange}
              width={containerWidth}
              playNote={(midiNumber) => {
                // 60 -> C4, 61 -> C#4, 62 -> D4, etc.
                const audio = new Audio(`/sounds/${midiNumber - 65}.mp3`)
                audio.play()
              }}
              stopNote={() => { }}
              keyboardShortcuts={keyboardShortcuts}
              disabled={this.state.disabled}
            />)}
                </DimensionsProvider>
        <div className=" flex md:flex-row flex-col mt-6 md:justify-between align-center gap-3 justify-center">
          <div className="flex gap-3 justify-center">
            <button className="!bg-green-400 button" onClick={this.onClickPlay}>Escuchar de nuevo</button>
            <button className="!bg-red-400 button" onClick={this.onClickStop}>Parar</button>
            {this.props.song
              ? null
              : (
                <button className="button" onClick={this.onClickClear}>Limpiar</button>
                )}
          </div>

          {this.props.song
            ? null
            : (
            <div className="flex justify-center items-center gap-5">
              <input
                type="text"
                placeholder="Titulo de la cancion"
                className="
            rounded-md bg-white border-2 border-black w-60 h-10 pl-5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                onFocus={() => this.setState({ disabled: true })}
                onBlur={() => this.setState({ disabled: false })}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <button
                className="button !bg-amber-400"
                onClick={() =>
                  this.uploadToSupabase(this.state.recording.events)
                }
                disabled={this.state.loading}
              >
                {this.state.loading ? <Loader /> : 'Compartir canción'}
              </button>
            </div>
              )}
        </div>
        <div className="mt-5">
          {/* <strong>Recorded notes</strong>
          <div>{JSON.stringify(this.state.recording.events)}</div> */}
          {this.state.error && (
            <div className="text-red-500">
              Ha ocurrido un error al compartir la canción
            </div>
          )}
        </div>
      </>
    )
  }
}
