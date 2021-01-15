var helicopterIMG, helicopterSprite;
var packageIMG, packageSprite, packageBody;
var ground, groundSprite;
var boxBaseSprite, boxLeftSprite, boxLeftBody, boxBottomBody, boxRightBody;
var helicopterSound, bugleSound;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopterIMG = loadImage("images/helicopter.png");
	packageIMG = loadImage("images/package.png");
	helicopterSound = loadSound("sounds/Helicopter.mp3");
	bugleSound = loadSound("sounds/Bugle.mp3");
}

function setup() {
	createCanvas(800, 700);
	helicopterSound.play();
	helicopterSound.setLoop(true);

	rectMode(CENTER);

	packageSprite = createSprite(width / 2, 80, 10, 10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale = 0.2;
	packageSprite.velocity = 3;

	helicopterSprite = createSprite(150, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	groundSprite = createSprite(width / 2, height - 35, width, 10);
	groundSprite.shapeColor = color(255);

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.rectangle(width / 2, 200, 80, 10, { isStatic: true });
	World.add(world, packageBody);

	// Create a Ground
	ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
	World.add(world, ground);

	boxPosition = width / 2 - 100;
	boxY = 610;

	boxLeftSprite = createSprite(boxPosition, boxY, 20, 100);
	boxLeftSprite.shapeColor = color(255, 0, 0);

	boxLeftBody = Bodies.rectangle(boxPosition + 20, boxY, 20, 100, { isStatic: true });
	World.add(world, boxLeftBody);

	boxBaseSprite = createSprite(boxPosition + 100, boxY + 40, 200, 20);
	boxBaseSprite.shapeColor = color(255, 0, 0);

	boxBottomBody = Bodies.rectangle(boxPosition + 100, boxY + 45 - 20, 200, 20, { isStatic: true });
	World.add(world, boxBottomBody);

	boxLeftSprite = createSprite(boxPosition + 200, boxY, 20, 100);
	boxLeftSprite.shapeColor = color(255, 0, 0);

	boxRightBody = Bodies.rectangle(boxPosition + 200 - 20, boxY, 20, 100, { isStatic: true });
	World.add(world, boxRightBody);

	Engine.run(engine);
}

function draw() {
	rectMode(CENTER);
	background(0);

	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;
	packageSprite.x = helicopterSprite.position.x;
	drawSprites();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		helicopterSprite.x -= 10;
	} else if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x += 10;
	}

	if (keyCode === DOWN_ARROW) {
		Body.setStatic(packageBody, false);
		helicopterSound.stop();
		bugleSound.play();
	}
}
