


const fightingSounds=[new Audio("../Assets/SoundEffects/Fighting/fighting1.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting2.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting3.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting4.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting5.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting6.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting7.mp3"),new Audio("../Assets/SoundEffects/Fighting/fighting8.mp3")]
const playSoundEffect=async(soundEffects:InstanceType<typeof Audio>[]) =>{
    let counter=0;
    while(counter!==2)
    {
        let index=Math.round(Math.random()*(soundEffects.length-1));
        let pickedSound=soundEffects[index];
        pickedSound.pause();
        pickedSound.currentTime=0;
        await new Promise(resolve => {
        pickedSound.addEventListener('ended', resolve, { once: true });
        pickedSound.play()
        })
        counter++;
    }
}
export const AuidoPlayer={
    playFightingSounds:()=>playSoundEffect(fightingSounds)
}