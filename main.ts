input.onGesture(Gesture.TiltRight, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    strip.show()
})
function Auge_rechts_gedrückt () {
    basic.showLeds(`
        . . # # #
        . . . # #
        . . # . #
        . # . . .
        # . . . .
        `)
    basic.clearScreen()
    if (Modus == 1) {
        DFPlayerPro.MP3_playFilePathName("dog.mp3")
        Mund_auf_zu()
    }
    if (Modus == 2) {
        strip.showRainbow(1, 360)
        strip.show()
    }
    if (Modus == 3) {
    	
    }
}
function Auge_links_gedrückt () {
    basic.showLeds(`
        # # # . .
        # # . . .
        # . # . .
        . . . # .
        . . . . #
        `)
    basic.clearScreen()
    if (Modus == 1) {
        DFPlayerPro.MP3_playFilePathName("cat.mp3")
        Mund_auf_zu()
    }
    if (Modus == 2) {
        strip.rotate(1)
        strip.show()
    }
    if (Modus == 3) {
    	
    }
}
function Starte () {
    basic.clearScreen()
    Modus_aktiv = 0
    Modus = 1
    basic.pause(500)
    DFPlayerPro.MP3_setSerial(SerialPin.P16, SerialPin.P8)
    DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOff)
    DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOff)
    DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
    lautstärke = 10
    DFPlayerPro.MP3_setVol(lautstärke)
    strip = neopixel.create(DigitalPin.P9, 7, NeoPixelMode.RGB)
    strip.setBrightness(60)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
}
function Logo_gedrückt () {
    if (Modus == 1) {
        basic.showString("Musik")
    }
    if (Modus == 2) {
        basic.showString("Licht")
    }
    if (Modus == 3) {
        basic.showString("Spiel")
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Modus_aktiv == 0) {
        music.play(music.createSoundExpression(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        Modus_aktiv = 1
        Logo_gedrückt()
    } else {
        Modus_aktiv = 0
    }
})
function B_gedrückt () {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    basic.clearScreen()
    if (Modus == 1) {
    	
    }
    if (Modus == 2) {
        RotiereLed = 1
    }
    if (Modus == 3) {
    	
    }
}
input.onButtonPressed(Button.B, function () {
    if (Modus_aktiv == 0) {
        if (Modus < 9) {
            Modus += 1
        }
    } else {
        B_gedrückt()
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    strip.show()
})
function A_gedrückt () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    basic.clearScreen()
    if (Modus == 1) {
    	
    }
    if (Modus == 2) {
        RotiereLed = 0
    }
    if (Modus == 3) {
    	
    }
}
input.onGesture(Gesture.Shake, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    if (Modus_aktiv == 0) {
        if (Modus > 1) {
            Modus += -1
        }
    } else {
        A_gedrückt()
    }
})
function Mund_auf_zu () {
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            . # # # .
            . . . . .
            `)
    }
}
input.onPinPressed(TouchPin.P1, function () {
    if (Modus_aktiv == 1) {
        Auge_links_gedrückt()
    }
})
input.onPinPressed(TouchPin.P2, function () {
    if (Modus_aktiv == 1) {
        Auge_rechts_gedrückt()
    }
})
let temp = 0
let RotiereLed = 0
let lautstärke = 0
let Modus_aktiv = 0
let Modus = 0
let strip: neopixel.Strip = null
Starte()
basic.forever(function () {
    if (Modus_aktiv == 0) {
        basic.showNumber(Modus)
        basic.pause(200)
        basic.clearScreen()
        basic.pause(200)
    }
})
basic.forever(function () {
    if (RotiereLed == 1) {
        strip.rotate(1)
        strip.show()
    }
    basic.pause(200)
})
basic.forever(function () {
    if (Modus == 1) {
        temp = Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 1, 20))
        if (temp != lautstärke) {
            lautstärke = temp
            DFPlayerPro.MP3_setVol(lautstärke)
        }
        basic.pause(50)
    }
    if (Modus == 2) {
        strip.setBrightness(Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 20, 255)))
        basic.pause(50)
    }
})
