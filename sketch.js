//var muse = musedata.connect('https://127.0.0.1:8081');
var muse = musedata.fake();

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(255);

    //check https://chrischne.github.io/musedataviewer/ to see the id's is use

    //raw eeg data in microvolts
    var eeg = muse.get('/muse/eeg');

    //relative values for frequency bands, return an object
    // {
    //	id: 
    //	leftEear:
    //	rightFront
    //	rightEar:
    //	mean:
    //}
    var alpha_relative = muse.get('/muse/elements/alpha_relative');
    var beta_relative = muse.get('/muse/elements/beta_relative');
    var delta_relative = muse.get('/muse/elements/delta_relative');
    var gamma_relative = muse.get('/muse/elements/gamma_relative');
    var theta_relative = muse.get('/muse/elements/theta_relative');

    //indicates the measurement quality of the data
    // 1 = good, 2 = ok, >=3 bad
    //returns an object
    //{
    //	id: "/muse/elements/horseshoe"
    //  leftEar:
    //	leftFront:
    //	rightEar:
    //	rightFront:
    //}
    var horseshoe = muse.get('/muse/elements/horseshoe');

    //tells if an electrode connection is good (1) or bad (0)
    //returns an object with id and values for each electrode
    var is_good = muse.get('/muse/elements/is_good');


    //shows wether the person is blinking (1) or not (0)
    //returns and object with id and value
    var blink = muse.get('/muse/elements/blink');

    //shows if the person is clenching the jaw (1) or not (0)
    //returns an object with id and value
    var jaw_clench = muse.get('/muse/elements/jaw_clench');

    //indicates if the headband is touching the forehead (1) or not (0)
    //returns an object with id and value
    var touching_forehead = muse.get('/muse/elements/touching_forehead');

    //returns raw fast fourier transform values, only needed in special cases
    var raw_fft0 = muse.get('/muse/elements/raw_fft0');
    var raw_fft1 = muse.get('/muse/elements/raw_fft1');
    var raw_fft2 = muse.get('/muse/elements/raw_fft2');
    var raw_fft3 = muse.get('/muse/elements/raw_fft3');

    //absolute values for frequency bands
    //returns and object with id, values for each elektrode and a mean value
    var alpha_absolute = muse.get('/muse/elements/alpha_absolute');
    var beta_absolute = muse.get('/muse/elements/beta_absolute');
    var delta_absolute = muse.get('/muse/elements/delta_absolute');
    var gamma_absolute = muse.get('/muse/elements/gamma_absolute');
    var theta_absolute = muse.get('/muse/elements/theta_absolute');

    //convenience functions
    //these return just one value, whic is the avg of all eletrodes with good connections
    var _alpha = muse.getAlpha();
    var _beta = muse.getBeta();
    var _gamma = muse.getGamma();
    var _delta = muse.getDelta();
    var _theta = muse.getTheta();

    //calculate a diameter from the beta value
    //the measured beta value is between 0 and 1
    //therefore it needs to be mapped to a range which is suitable for a diameter
    var d = map(_beta, 0, 0.3, 0, 300);

    console.log(_beta);

    fill('red');
    ellipse(width / 2, height / 2, d, d);
}