var background_colors = [
    {
        top_background: "#FFACCB",
        bottom_background: "#FF9ABD",
        buttons: "#FF6499",
    },
    {
        top_background: "#C1CCF9",
        bottom_background: "#A6B7FF",
        buttons: "#899EF7"
    },
    {
        top_background: "#F4CA84",
        bottom_background: "#F1C178",
        buttons: "#F3B169"
    },
    {
        top_background: "#CEEAAA",
        bottom_background: "#C2E498",
        buttons: "#ACD779"
    },
    {
        top_background: "#C5B9EE",
        bottom_background: "#B9A9EC",
        buttons: "#9F85F5"
    },
    {
        top_background: "#E79BB9",
        bottom_background: "#EA8EB2",
        buttons: "#E976A4"
    },
    {
        top_background: "#FFF1B6",
        bottom_background: "#FFE793",
        buttons: "#FFD966"
    },
    {
        top_background: "#90D3B9",
        bottom_background: "#76CBAA",
        buttons: "#00AB94"
    },
    {
        top_background: "#F0F0F0",
        bottom_background: "#E0E0E0",
        buttons: "#C4C4C4"
    },
    {
        top_background: "#C7EEFF",
        bottom_background: "#B3E3FE",
        buttons: "#4FC3F7"
    },
    {
        top_background: "#BFD4DC",
        bottom_background: "#A8C1CB",
        buttons: "#86B7CB"
    },
    {
        top_background: "#DAECB5",
        bottom_background: "#C9DE9C",
        buttons: "#B8D677"
    },
    {
        top_background: "#333333",
        bottom_background: "#282828",
        buttons: "#666666"
    }
]

var background_color = background_colors[Math.floor(Math.random()*background_colors.length)];

// change background colors
document.body.style.backgroundColor = background_color.top_background;
document.getElementById("topDiv").style.backgroundColor = background_color.top_background;
document.getElementById("bottomDiv1").style.backgroundColor = background_color.bottom_background;
document.getElementById("bottomDiv2").style.backgroundColor = background_color.bottom_background;
document.getElementById("watchAdDiv").style.backgroundColor = background_color.bottom_background;

// change button colors
stylesheet = document.styleSheets[0]
stylesheet.insertRule(".bigActionButton { background-color: " + background_color.buttons + ";}", 0);
stylesheet.insertRule(".actionButton { background-color: " + background_color.buttons + ";}", 0);

document.getElementById("buyMoreStars").style.backgroundColor = background_color.buttons;
document.getElementById("speech_bubble_bg").style.fill = background_color.bottom_background;
document.getElementById("loadFavHoomans").style.backgroundColor = background_color.buttons;
document.getElementById("openStore").style.backgroundColor = background_color.buttons;

document.getElementById("accountIcon").style.fill = background_color.buttons;
document.getElementById("homeIcon").style.fill = background_color.buttons;

document.getElementById("adsForStarsButton").style.backgroundColor = background_color.buttons;

// change shadow color
document.getElementById("ellip").style.fill = background_color.bottom_background;

// change goodie bag color
document.getElementById("goodie_bag_handle").style.fill = background_color.buttons;
document.getElementById("goodie_bag_heart").style.fill = background_color.buttons;
document.getElementById("goodie_bad_body").style.fill = background_color.buttons;

// change podium logo color
document.getElementById("podium").style.fill = background_color.buttons;

// change camara logo color
document.getElementById("cameraPart1").style.fill = background_color.buttons;
document.getElementById("cameraPart2").style.fill = background_color.buttons;

// change photobook logo color
document.getElementById("photobookPart1").style.fill = background_color.buttons;
document.getElementById("photobookPart2").style.fill = background_color.buttons;
document.getElementById("photobookPart3").style.fill = background_color.buttons;

// change ins icon color
document.getElementById("ins_icon_1").style.stroke = background_color.buttons;
document.getElementById("ins_icon_2").style.stroke = background_color.buttons;
document.getElementById("ins_icon_3").style.stroke = background_color.buttons;
document.getElementById("ins_icon_4").style.stroke = background_color.buttons;

// change discord icon color
document.getElementById("discord_icon").style.fill = background_color.buttons;

document.getElementById("daycare_icon").style.fill = background_color.buttons;

// change space name header color
document.getElementById("spaceName").style.backgroundColor = background_color.bottom_background;

// change color of hearts
const hearts = document.getElementsByClassName("heart_image");
for (let i = 0; i < hearts.length; i++) {
    hearts[i].style.fill = background_color.buttons;
    hearts[i].style.stroke = background_color.buttons;
}

document.getElementById("daycareSectionBg").style.backgroundColor = background_color.bottom_background;

document.getElementById("chatBubbleBg").style.backgroundColor = background_color.bottom_background;
var bubbleTip = document.createElement("div");
bubbleTip.style = "position: absolute; bottom: 0; left: 50%; width: 0; height: 0; border: 20px solid transparent; border-top-color: " + background_color.bottom_background + "; border-bottom: 0; border-left: 0; margin-left: 30px; margin-bottom: -15px; border-radius: 5px";
document.getElementById("chatBubbleBg").appendChild(bubbleTip);