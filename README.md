# 🦆 Quackboard
This is a project for the Hackafor 2023, a Spanish hackathon. It's basically a piano that plays back duck sounds and you can share your creations with your friends.

## Tech stack
- Next.js 13
- TailwindCSS
- `react-piano`
- Supabase (DB and Twitch auth)

## How it works
`react-piano` gives us a very powerful piano keyboard that allows mapping to MIDI and has some nice hooks. But it doesn't play any sound by itself, it must be provided either by using a Soundfont or manually hooking the note played event and playing the sound manually (we chose the latter).

Every note is contained at /public/sounds, relative to the octave position being 0 the original quack.

Auth is done via Supabase, which also manages the DB.

## Collaborators 
- @owlnai
- @adriDiazz