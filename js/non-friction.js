/**
* Este codigo realiza una simulación de dos pendulos acoplados, uno debajo
* del otro, es posible variarles las masas, longitudes y condiciones iniciales.
*
* Lorena Bucurú Rodriguez; Andŕes Felipe Moreno Sarria
*/
var g = 9.81;  // Gravedad
var timeN = 0;  // Tiempo inicial

/**
* Este objeto corresponde al "canvas" o lienzo en el cual se realizará la
* animación
*/
var nonFriction = {
  element: document.getElementById("non-friction"),
  width: 1000,
  height: 500,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
  },
};

var nonFrictionPhaseSpace = {
  element: document.getElementById("phase-N"),
  width: 300,
  height: 300,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
    this.context.translate(this.width/2, this.height/2);
  },

  phaseDraw: function (pendulumA, pendulumB) {
    this.context.beginPath();
    this.context.fillStyle = pendulumA.color;
    this.context.arc(pendulumA.angle*this.height/2,
      pendulumB.angle*this.height/2, 0.5, 0, 2*Math.PI);
    this.context.fill();
  }
};

var nonFrictionGraphs = {
  graphTheta1: {
    element: document.getElementById("theta-1-N"),
    width: 1000,
    height: 200,

    init: function () {
      this.element.width = this.width;
      this.element.height = this.height;
      this.context = this.element.getContext("2d");
      this.context.translate(this.width, this.height/2);
    },

    draw: function (pendulum) {
      this.context.beginPath();
      this.context.fillStyle = pendulum.color;
      this.context.arc(0, pendulum.angle*this.height/2, 2, 0, 2*Math.PI);
      this.context.fill();
    },

    step: function () {
      var copy = this.context.getImageData(0,0,this.width, this.height);
      this.context.putImageData(copy, -1, 0);
      this.context.clearRect(-1,-this.height/2, 4, this.height);
    },

    grid: function (time) {
      var sep = 10 * Math.PI/180;
      for (var i = -Math.PI; i <= Math.PI; i += sep) {
        this.context.beginPath();
        if (Math.abs(i) <= 0.1) {
          this.context.fillStyle = "#393939";
        }else {
          this.context.fillStyle = "#BDBDBD";
        }
        this.context.arc(0, i*this.height/2, 1, 0, 2*Math.PI);
        this.context.fill();
      }

      if (time % 5 < 0.1) {
        this.context.beginPath();
        this.context.strokeStyle = "#BDBDBD";
        this.context.moveTo(-1,-this.height/2);
        this.context.lineTo(-1,this.height/1);
        this.context.stroke();
      }
    }
  },
  graphTheta2: {
    element: document.getElementById("theta-2-N"),
    width: 1000,
    height: 200,

    init: function () {
      this.element.width = this.width;
      this.element.height = this.height;
      this.context = this.element.getContext("2d");
      this.context.translate(this.width, this.height/2);
    },

    draw: function (pendulum) {
      this.context.beginPath();
      this.context.fillStyle = pendulum.color;
      this.context.arc(0, pendulum.angle*this.height/2, 2, 0, 2*Math.PI);
      this.context.fill();
    },

    step: function () {
      var copy = this.context.getImageData(0,0,this.width, this.height);
      this.context.putImageData(copy, -1, 0);
      this.context.clearRect(-1,-this.height/2, 4, this.height);
    },

    grid: function (time) {
      var sep = 10 * Math.PI/180;
      for (var i = -Math.PI; i <= Math.PI; i += sep) {
        this.context.beginPath();
        if (Math.abs(i) <= 0.1) {
          this.context.fillStyle = "#393939";
        }else {
          this.context.fillStyle = "#BDBDBD";
        }
        this.context.arc(0, i*this.height/2, 1, 0, 2*Math.PI);
        this.context.fill();
      }

      if (time % 5 < 0.01) {
        this.context.beginPath();
        this.context.strokeStyle = "#BDBDBD";
        this.context.moveTo(-1,-this.height/2);
        this.context.lineTo(-1,this.height/1);
        this.context.stroke();
      }
    }
  }
};

nonFriction.init();  // Inizcializar el nonFriction
nonFrictionGraphs.graphTheta1.init();
nonFrictionGraphs.graphTheta2.init();
nonFrictionPhaseSpace.init();


// pendulo 1 sin aproximación
var pendulum1NN = new Pendulum(1, [0,0], 200, -20, 0, "#3cb0f8");

// pendulo 2 sin aproximación
var pendulum2NN = new Pendulum(1, [pendulum1NN.length*
  Math.sin(pendulum1NN.angle), pendulum1NN.length*Math.cos(pendulum1NN.angle)],
  200, 15, 0, "#3cb0f8");

// pendulo 1 con aproximación
var pendulum1NA = new Pendulum(1, [0,0], 200, -20, 0, "#f25353");

// pendulo 2 con aproximación
var pendulum2NA = new Pendulum(1, [pendulum1NA.length*
  Math.sin(pendulum1NA.angle), pendulum1NA.length*Math.cos(pendulum1NA.angle)],
  200, 15, 0, "#f25353");

/**
* Función para actualizar la pantalla
*/
function setNonFrictionReset () {
  nonFriction.context.clearRect(0, 0, nonFriction.width, nonFriction.height);

  var h = 0.05;

  RK4(pendulum1NN, pendulum2NN, h, timeN, dThetaNN1, dOmegaNN1, dThetaNN2,
    dOmegaNN2);

  RK4(pendulum1NA, pendulum2NA, h, timeN, dThetaNA1, dOmegaNA1, dThetaNA2,
    dOmegaNA2);

  timeN += h;
  pendulum2NN.draw(nonFriction);
  pendulum1NN.draw(nonFriction);
  pendulum2NA.draw(nonFriction);
  pendulum1NA.draw(nonFriction);

  nonFrictionGraphs.graphTheta1.grid(timeN);
  nonFrictionGraphs.graphTheta1.draw(pendulum1NN);
  nonFrictionGraphs.graphTheta1.draw(pendulum1NA);
  nonFrictionGraphs.graphTheta1.step();
  nonFrictionGraphs.graphTheta2.grid(timeN);
  nonFrictionGraphs.graphTheta2.draw(pendulum2NN);
  nonFrictionGraphs.graphTheta2.draw(pendulum2NA);
  nonFrictionGraphs.graphTheta2.step();

  nonFrictionPhaseSpace.phaseDraw(pendulum1NN, pendulum2NN);
  nonFrictionPhaseSpace.phaseDraw(pendulum1NA, pendulum2NA);
}
