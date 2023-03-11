import morningImg from '../Assets/Images/morning-img.jpg';
import afternoonImg from '../Assets/Images/afternoon-img.jpg';
import eveningImg from '../Assets/Images/evening-img.jpg';
import sunirise from '../Assets/lottiefiles/sunrise.json'
import sun from '../Assets/lottiefiles/sun.json'
import moon from '../Assets/lottiefiles/moon.json'

export const greeting = () => {
    const time = new Date().getHours();
    if ((time >= 0 && time <= 12)) {
        return {
            greet: "Good morning",
            message: "Begin your day with His Word",
            image: morningImg,
            lottie: sunirise
        };

    }
    else if (time > 12 && time <= 16) {
        return {
            greet: "Good afternoon",
            message: "Take a midday break in the word",
            image: afternoonImg,
            lottie: sun
        };

    }
    else {
        return {
            greet: "Good evening",
            message: "End your day anchored in His Love",
            image: eveningImg,
            lottie: moon
        };
    }
}