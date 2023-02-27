import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import Auth from '../components/Auth';

import { Sampler } from "tone";

/*
ver después



let player;

let shifter;
let button;
let shiftSlider;

let wetMix;


function preload(){

shifter = new Tone.PitchShift(2).toMaster();


player = new Tone.Player("/quack.mp3").connect(shifter); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  wetMix = createSlider(0, 1, 1, 0);
  wetMix.style("width", "200px");
  wetMix.position(width / 2 - 100, height / 2 + 80);

  shiftSlider = createSlider(-12, 12, 2, 1);
  shiftSlider.style("width", "200px");
  shiftSlider.position(width / 2 - 100, height / 2 + 150);


  button = createButton("Play Sound");
  button.position(width / 2 - 50, height / 2);
  button.mousePressed(play1);
}

function draw() {
  shifter.wet.value = wetMix.value();
  shifter.pitch = shiftSlider.value();


  background(143, 204, 124);

  textFont("Helvetica");
  textSize(17);
  text("PitchShift Example", width / 2, height / 2 - 100);
  textSize(10);
  fill(255);

  textAlign(CENTER);
  text(int(wetMix.value() * 100) + "% effected sound", wetMix.x + 100, wetMix.y - 10);
  textAlign(CENTER);
  text("Shift value parameter: " + shiftSlider.value() + " half steps", shiftSlider.x + 100, shiftSlider.y - 25);


}

function play1() {
  player.start();
}
*/

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Auth />
        <h1 className="text-3xl font-bold underline">
          Página de inicio
        </h1>
      </section>
    </Layout>
  );
}