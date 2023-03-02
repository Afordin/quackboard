import { KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import React from 'react';
import PianoRecording from './PianoRecording';
import _ from 'lodash';

const noteRange = {
    first: MidiNumbers.fromNote('c4'),
    last: MidiNumbers.fromNote('b4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});
export default class Quackboard extends React.Component {
    state = {
        recording: {
            mode: 'RECORDING',
            events: [],
            currentTime: 0,
            currentEvents: [],
        },
    };

    constructor(props) {
        super(props);

        this.scheduledEvents = [];
    }

    getRecordingEndTime = () => {
        if (this.state.recording.events.length === 0) {
            return 0;
        }
        return Math.max(
            ...this.state.recording.events.map(event => event.time + event.duration),
        );
    };

    setRecording = value => {
        this.setState({
            recording: Object.assign({}, this.state.recording, value),
        });
    };

    onClickPlay = () => {
        this.setRecording({
            mode: 'PLAYING',
        });
        const startAndEndTimes = _.uniq(
            _.flatMap(this.state.recording.events, event => [
                event.time,
                event.time + event.duration,
            ]),
        );
        startAndEndTimes.forEach(time => {
            this.scheduledEvents.push(
                setTimeout(() => {
                    const currentEvents = this.state.recording.events.filter(event => {
                        return event.time <= time && event.time + event.duration > time;
                    });
                    this.setRecording({
                        currentEvents,
                    });
                }, time * 1000),
            );
        });
        // Stop at the end
        setTimeout(() => {
            this.onClickStop();
        }, this.getRecordingEndTime() * 1000);
    };

    onClickStop = () => {
        this.scheduledEvents.forEach(scheduledEvent => {
            clearTimeout(scheduledEvent);
        });
        this.setRecording({
            mode: 'RECORDING',
            currentEvents: [],
        });
    };

    onClickClear = () => {
        this.onClickStop();
        this.setRecording({
            events: [],
            mode: 'RECORDING',
            currentEvents: [],
            currentTime: 0,
        });
    };
    render() {
        return (<>
            <PianoRecording
                recording={this.state.recording}
                setRecording={this.setRecording}
                noteRange={noteRange}
                width={300}
                playNote={(midiNumber) => {
                    console.log(midiNumber)
                    // 60 -> C4, 61 -> C#4, 62 -> D4, etc.
                    const audio = new Audio(`/sounds/${midiNumber - 60}.mp3`);
                    audio.play();
                }}
                stopNote={() => { }}
                keyboardShortcuts={keyboardShortcuts}
            />
            <div className="mt-5 flex gap-3">
                <button onClick={this.onClickPlay}>Play</button>
                <button onClick={this.onClickStop}>Stop</button>
                <button onClick={this.onClickClear}>Clear</button>
            </div>
            <div className="mt-5">
                <strong>Recorded notes</strong>
                <div>{JSON.stringify(this.state.recording.events)}</div>
            </div>
        </>
        );
    }
}
