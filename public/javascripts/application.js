function myFunction(x) {
    if (x.matches) { // If media query matches
        console.log('MEDIA MEDIA')
    }
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)
