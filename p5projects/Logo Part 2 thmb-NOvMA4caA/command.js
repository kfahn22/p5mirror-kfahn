// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw

class Command {
  constructor(name, arg) {
    this.name = name;
    this.arg = arg;
    this.commands = [];
  }
}