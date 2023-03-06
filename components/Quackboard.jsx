import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import React from "react";
import PianoRecording from "./PianoRecording";
import { supabase } from "../utils/supabaseClient";
import Loader from "./Loader";
import ModalComponent from "./ModalComponent";
import _ from "lodash";

const noteRange = {
  first: MidiNumbers.fromNote("c4"),
  last: MidiNumbers.fromNote("b4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

//get the current supabase user

export default class Quackboard extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: this.props.song ? JSON.parse(this.props.song) : [],
      currentTime: 0,
      currentEvents: [],
    },
    error: null,
    loading: false,
    modalIsOpen: false,
    disabled: false,
    title: "",
  };

  constructor(props) {
    super(props);

    this.scheduledEvents = [];
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  uploadToSupabase = async (events) => {
    this.setState({ loading: true });

    this.setState({ modalIsOpen: true });

    const user = await (await supabase.auth.getSession()).data.session.user.id;
    const { nickname, picture } = await await (
      await supabase.auth.getSession()
    ).data.session.user.identities[0].identity_data;
    const { data, error } = await supabase.from("canciones").insert({
      author: user,
      message: JSON.stringify(events),
      username: nickname,
      profilePicture: picture,
      title: this.state.title,
    });
    if (error) {
      console.log(error);
      this.setState({ error: error });
    } else {
      this.setState({ loading: false });
    }
  };

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map((event) => event.time + event.duration)
    );
  };

  setRecording = (value) => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    });
  };

  setEvents = (value) => {
    this.setState({
      events: Object.assign({}, this.state.recording.currentEvents, value),
    });
  };

  onClickPlay = () => {
    console.log(this.state.recording.events);
    this.setRecording({
      mode: "PLAYING",
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events?.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents,
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  //play props song
  onClickPlayProps = (events) => {
    this.setRecording({
      mode: "PLAYING",
      events: events,
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events?.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents,
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: [],
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
    });
  };

  componentDidMount() {
    if (this.props.song) {
      this.onClickPlayProps(JSON.parse(this.props.song));
    }
  }

  render() {
    return (
      <>
        <PianoRecording
          recording={this.state.recording}
          setRecording={this.setRecording}
          noteRange={noteRange}
          width={1120}
          playNote={(midiNumber) => {
            // 60 -> C4, 61 -> C#4, 62 -> D4, etc.
            const audio = new Audio(`/sounds/${midiNumber - 60}.mp3`);
            audio.play();
          }}
          stopNote={() => {}}
          keyboardShortcuts={keyboardShortcuts}
          disabled={this.state.disabled}
        />
        <div className=" flex mt-12 justify-between align-middle">
          <div className="flex gap-3">
            <button onClick={this.onClickPlay}>Play</button>
            <button onClick={this.onClickStop}>Stop</button>
            {this.props.song ? null : (
              <button onClick={this.onClickClear}>Clear</button>
            )}
          </div>

          {this.props.song ? null : (
            <div className="flex justify-center items-center gap-5">
              <input
                type="text"
                placeholder="Titulo de la cancion"
                className="
            rounded-md bg-gray-100 w-60 h-10 pl-5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                onFocus={() => this.setState({ disabled: true })}
                onBlur={() => this.setState({ disabled: false })}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <button
                className="rounded-md bg-pink-600 w-40 h-10 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                onClick={() =>
                  this.uploadToSupabase(this.state.recording.events)
                }
                disabled={this.state.loading}
              >
                {this.state.loading ? <Loader /> : "Compartir Cancion"}
              </button>
            </div>
          )}
        </div>
        <div className="mt-5">
          {/* <strong>Recorded notes</strong>
          <div>{JSON.stringify(this.state.recording.events)}</div> */}
          {this.state.error && (
            <div className="text-red-500">
              A ocurrido un error al compartir la cancion
            </div>
          )}
        </div>
      </>
    );
  }
}
