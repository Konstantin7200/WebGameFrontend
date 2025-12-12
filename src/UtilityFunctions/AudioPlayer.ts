const fightingSounds = [
  new Audio(require('../Assets/SoundEffects/Fighting/fighting1.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting2.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting3.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting4.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting5.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting6.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting7.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting8.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting9.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting10.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting11.mp3')),
  new Audio(require('../Assets/SoundEffects/Fighting/fighting12.mp3'))
];
const clickSound=new Audio(require("../Assets/SoundEffects/Click/button-press.mp3"))
const music=new Audio(require("../Assets/Music/music.mp3"))
const playSoundEffect=async(soundEffects:InstanceType<typeof Audio>[],playingTime:number,volume:number=1) =>{
    let flag=true;
    setTimeout(()=>{
        flag=false
    },playingTime)
    while(flag)
    {
        let index=Math.round(Math.random()*(soundEffects.length-1));
        let pickedSound=soundEffects[index];
        pickedSound.pause();
        pickedSound.volume=volume;
        pickedSound.currentTime=0;
        await new Promise(resolve => {
        pickedSound.addEventListener('ended', resolve, { once: true });
        pickedSound.play()
        })

    }
}
const playSound=async(sound:InstanceType<typeof Audio>,volume:number)=>{
    sound.volume=volume;
    sound.play();
}
const playMusic=async(music:InstanceType<typeof Audio>)=>{
    music.loop=true;
    playSound(music,0.1);
}
export const AudioPlayer={
    playFightingSounds:()=>playSoundEffect(fightingSounds,500,0.7),
    playMusic:()=>playMusic(music),
    playClick:()=>playSound(new Audio(clickSound.src),1)
}