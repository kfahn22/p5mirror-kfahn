

//https://github.com/isohedral/hatviz/blob/main/LICENSE
// BSD 3-Clause License

// Copyright (c) 2023, Craig S. Kaplan

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.

// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.



//code from https://github.com/isohedral/hatviz
function setup() {
	createCanvas( windowWidth, windowHeight );

	tiles = [H_init, T_init, P_init, F_init];
	level = 1;

	black = color( 'black' );

	reset_button = addButton( "Reset", function() {
		tiles = [H_init, T_init, P_init, F_init];
		level = 1;
		radio.selected( 'H' );
		to_screen = [20, 0, 0, 0, -20, 0];
		lw_scale = 1;
		setButtonActive( draw_hats, true );
		setButtonActive( draw_super, true );
		loop();
	} );
	subst_button = addButton( "Build Supertiles", function() {
		const patch = constructPatch( ...tiles );
		tiles = constructMetatiles( patch );
		++level;
		loop();
	} );
	box_height += 10;

	radio = createRadio();
	radio.mousePressed( function() { loop() } );
	radio.position( 10, box_height );
	for( let s of ['H', 'T', 'P', 'F'] ) {
		let o = radio.option( s );
		o.onclick = loop;
	}
	radio.selected( 'H' );
	box_height += 40;

	const cp_info = {
		'H1' : [0, 137, 212],
		'H' : [148, 205, 235],
		'T' : [251, 251, 251],
		'P' : [250, 250, 250],
		'F' : [191, 191, 191]
	};

	let count = 0;
	for( let [name, col] of Object.entries( cp_info ) ) {
		const label = createSpan( name );
		label.position( 10 + 70*count, box_height );
		const cp = createColorPicker( color( ...col ) );
		cp.mousePressed( function() { loop() } );
		cp.position( 10 + 70*count, box_height + 20 );
		cols[name] = cp;

		++count;
		if( count == 2 ) {
			count = 0;
			box_height += 50;
		}
	}
	if( count == 1 ) {
		box_height += 50;
	}
	box_height += 20;

	translate_button = addButton( "Translate", function() {
		setButtonActive( translate_button, true );
		setButtonActive( scale_button, false );
		loop();
	} );
	scale_button = addButton( "Scale", function() {
		setButtonActive( translate_button, false );
		setButtonActive( scale_button, true );
		loop();
	} );

	setButtonActive( translate_button, true );
	box_height += 10;
	
	draw_hats = addButton( "Draw Hats", function() {
		setButtonActive( draw_hats, !isButtonActive( draw_hats ) );
		loop();
	} );
	draw_super = addButton( "Draw Supertiles", function() {
		setButtonActive( draw_super, !isButtonActive( draw_super ) );
		loop();
	} );

	setButtonActive( draw_hats, true );
	setButtonActive( draw_super, true );
	box_height += 10;

	addButton( "Save PNG", function () {
		uibox = false;
		draw();
		save( "output.png" );
		uibox = true;
		draw();
	} );

	addButton( "Save SVG", function () {
		svg_serial = 0;
		for( let t of tiles ) {
			t.resetSVG();
		}

		const stream = [];
		stream.push( `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">` );
		stream.push( '<defs>' );
		for( let t of tiles ) {
			t.buildSVGDefs( stream, mag( to_screen[0], to_screen[1] ) );
		}
		stream.push( '</defs>' );

		const idx = {'H':0, 'T':1, 'P':2, 'F':3}[radio.value()];
		const S = mul( ttrans( width/2, height/2 ), to_screen );

		if( isButtonActive( draw_hats ) ) {
			stream.push( getSVGInstance( tiles[idx].getSVGFillID(), S ) );
		}
		if( isButtonActive( draw_super ) ) {
			stream.push( getSVGInstance( tiles[idx].getSVGStrokeID(), S ) );
		}
		stream.push( '</svg>' );

		saveStrings( stream, 'output', 'svg' );
	} );

	addButton( "Save Matrices", function() {
		const stream = [];
		const idx = {'H':0, 'T':1, 'P':2, 'F':3}[radio.value()];
		tiles[idx].getText( stream, ident );
		saveStrings( stream, 'output', 'txt' );
	} );

	box_height -= 5; // remove half the padding
}

function draw()
{
	background( 255 );

	push();
	translate( width/2, height/2 );
	const idx = {'H':0, 'T':1, 'P':2, 'F':3}[radio.value()];

	if( isButtonActive( draw_hats ) ) {
		tiles[idx].draw( to_screen, level );
	}

	if( isButtonActive( draw_super ) ) {
		for( let lev = level - 1; lev >= 0; --lev ) {
			tiles[idx].draw( to_screen, lev );
		}
	}
	pop();

	if( uibox ) {
		stroke( 0 );
		strokeWeight( 0.5 );
		fill( 255, 220 );
		rect( 5, 5, 135, box_height);
	}
	noLoop();
}

function windowResized() 
{
	resizeCanvas( windowWidth, windowHeight );
}

function mousePressed()
{
	dragging = true;
	if( isButtonActive( scale_button ) ) {
		scale_centre = transPt( inv( to_screen ), pt( width/2, height/2 ) );
		scale_start = pt( mouseX, mouseY );
		scale_ts = [...to_screen];
	}
	loop();
}

function mouseDragged()
{
	if( dragging ) {
		if( isButtonActive( translate_button ) ) {
			to_screen = mul( ttrans( mouseX - pmouseX, mouseY - pmouseY ), 
				to_screen );
		} else if( isButtonActive( scale_button ) ) {
			let sc = dist( mouseX, mouseY, width/2, height/2 ) / 
				dist( scale_start.x, scale_start.y, width/2, height/2 );
			to_screen = mul( 
				mul( ttrans( scale_centre.x, scale_centre.y ),
					mul( [sc, 0, 0, 0, sc, 0],
						ttrans( -scale_centre.x, -scale_centre.y ) ) ),
				scale_ts );
			lw_scale = mag( to_screen[0], to_screen[1] ) / 20.0;
		}
		loop();
		return false;
	} 
}

function mouseReleased()
{
	dragging = false;
	loop();
}