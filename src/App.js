import React, { Component } from 'react';
import './App.css';

const townNames = ["Kaliningrad","Volgograd","Novokuznetsk","Novosibirsk","Vlidicostok","Tomsk","Omsk","Alexandrovsk","Georgiyevsk","Kadnikov","Muravlenko","Nevinnomyssk","Minsk","Pinsk","Stalingrad","Ussuriysk","Valday","Verkhneuralsk","Yemanzhelinsk","Zheleznodorozhny","Zmeinogorsk","Svetlogorsk","Raychikhinsk","Pokhvistnevo","Ostrogozhsk","Lakhdenpokhya","Krasnoznamensk"];
const townname = townNames[Math.floor(Math.random() * townNames.length)];

const quotes = [
  "Death is the solution to all problems. No man - no problem.",
  "Those who vote decide nothing. Those who count the vote decide everything.",
  "A single death is a tragedy; a million deaths is a statistic.",
  "The death of one man is a tragedy. The death of millions is a statistic.",
  "Education is a weapon, whose effect depends on who holds it in his hands and at whom it is aimed.",
  "I believe in one thing only, the power of the human will.",
  "The only real power comes out of a long rifle.",
  "In the Soviet army it takes more courage to retreat than advance.",
  "The Pope! How many divisions has he got?",
  "History shows that there are no invincible armies.",
  "Everyone imposes his own system as far as his army can reach.",
  "Ideas are more powerful than guns. We would not let our enemies have guns, why should we let them have ideas.",
  "When we hang the capitalists they will sell us the rope we use.",
  "I trust no one, not even myself.",
  "Gratitude is a sickness suffered by dogs.",
  "A sincere diplomat is like dry water or wooden iron.",
  "Everybody has a right to be stupid, but some people abuse the privilege.",
  "A lot of times, I can turn and pass without even looking.",
  "The only way a kid is going to practise is if it's total fun for him... and it was for me.",
  "Die, but do not retreat.",
  "A man's eyes should be torn out if he can only see the past.",
  "Do you remember the tsar? Well, I‘m like a tsar.",
  "In war I would deal with the Devil and his grandmother.",
  "Artillery is the god of war.",
  "In the future, there will be fewer but better Russians.",
  "You know, they are fooling us, there is no God.",
  "It is not heroes that make history, but history that makes heroes.",
  "When you chop wood, splinters fly."
];

//If you don't want spoilers, don't read further.
//The game is meant to be played without knowledge of mechanics.
//Don't ruin it for yourself. :)

class App extends Component {
  state = {
    log : [],
    quarter : 1,
    population : Math.round(Math.random() * 10) + 45,
    vault : 1250,
    wallet : 0,
    unity : Math.round(Math.random() * 5) + 95
  }

  componentDidMount() {
    this.main();
  }

  render() {
    return (
      <div className="App">
        <div id="TopDiv">
          <div id="QuarterDiv">
            <h1 className="blue">QUARTER {this.state.quarter}</h1>
            <p className="yellow">{townname}</p>
            <p className="yellow">pop. {this.state.population}</p>
          </div>
          <div id="StatsDiv">
            <p className="yellow">Vault: {this.state.vault}</p>
            <p className="yellow">Wallet: {this.state.wallet}</p>
            <p className="yellow">Unity: {this.state.unity}%</p>
            <p className="yellow">Stalin {this.stalinWhen()}, Army {this.armyWhen()}</p>
          </div>
        </div>
        <div id="PrintLog">
          {this.printLog()}
        </div>
      </div>
    );
  }

  stalinWhen = () => {
    if ((5 - (this.state.quarter % 5)) === 5) {
      return "now";
    } else {
      return "in " + (5 - (this.state.quarter % 5));
    }
  }

  armyWhen = () => {
    if ((3 - (this.state.quarter % 3)) === 3) {
      return "now";
    } else {
      return "in " + (3 - (this.state.quarter % 3));
    }
  }

  main = () => {
    var mainState = this.clone(this.state);

    if (mainState.quarter % 3 === 0) {
      this.saveToLog("The army has arrived!", "blue");
      const numOfSoldiers = Math.round((Math.random() * 8) + 10);
      this.saveToLog("The army consists of " + numOfSoldiers + " soldiers.");
      const steals = Math.floor(numOfSoldiers * (mainState.population / 75));
      if (mainState.vault < steals) {
        this.saveToLog("The army pillaged the vault. They found too little inside.");
        this.saveToLog("Instead, they decided to steal from the people. -15% unity!", "red");
        mainState.unity = mainState.unity - 15;
        this.setState({ unity : mainState.unity });
      } else {
        this.saveToLog("The army has stolen " + steals + " from the vault. -" + steals + " rubles!", "red");
        mainState.vault = mainState.vault - steals;
        this.setState({ vault : mainState.vault });
      }

      if (mainState.wallet < 100) {
        this.saveToLog("The army noticed that you had basically no money. You accept an offer to be given 100 rubles.");
        this.saveToLog("The army then proceeds to terrorize your town. -10% unity!", "red");
        mainState.unity = mainState.unity - 10;
        mainState.wallet = mainState.wallet + 100;
        this.setState({ unity : mainState.unity });
        this.setState({ wallet : mainState.wallet });
      } else if (mainState.wallet > 2000) {
        this.saveToLog("The army noticed that you had a large amount of money.");
        this.saveToLog("They steal a third of your wealth. -" + Math.floor(mainState.wallet / 3) + " rubles!");
        mainState.wallet = mainState.wallet * 2;
        mainState.wallet = Math.floor(mainState.wallet / 3);
        this.setState({ wallet : mainState.wallet });
      } else {
        this.saveToLog("You yourself weren't poor or rich so the army left you alone.");
      }
    }

    if (mainState.quarter % 5 === 0) {
      this.saveToLog("Stalin has arrived!", "blue");

      if (mainState.wallet > 1000) {
        this.askToLog("Stalin noticed your bulging wallet. ", "red", ["Try to run."], (nothing) => {
          this.askToLog("You cannot run. ", "red", ["Try to hide."], (nothing) => {
            this.askToLog("You cannot hide. ", "red", ["****"], (nothing) => {
              this.askToLog("I am always watching. ", "red", ["Help!"], (nothing) => {
                this.askToLog("You do not lament the loss of hair of one who has been beheaded. ", "red", ["No!"], (nothing) => {
                  this.askToLog("You have been beheaded. They do not lament your loss of hair. ", "red", ["..."], (nothing) => {
                    if (mainState.quarter === 5) {
                      this.saveToLog("Found a secret ending!", "yellow");
                      this.askToLog("You managed to get killed the first time Stalin arrived.", "green", ["Yay!"], (nothing) => {
                        this.finishGame();
                      });
                    } else {
                      this.finishGame();
                    }
                  });
                });
              });
            });
          });
        });
      }

      if (mainState.vault < 0) {
        this.saveToLog("Stalin is angry with you for going into debt. He kills half the population.", "red");
        mainState.population = Math.floor(mainState.population / 2);
        this.setState({ population : mainState.population });
      }

      this.saveToLog(quotes[Math.floor(Math.random() * quotes.length)], "yellow");
      this.saveToLog("His incredible speech increased unity by 15%!", "green");

      mainState.unity = mainState.unity + 15;
      this.setState({ unity : mainState.unity });

      if (Math.floor(Math.random() * 5) === 0) {
        this.saveToLog("In fact, it was so great it completely ignored the 100% maximum for unity!", "green");
      } else {
        if (mainState.unity > 100) {
          mainState.unity = 100;
          this.setState({ unity : 100 });
        }
      }

      if (townname === "Stalingrad") {
        this.saveToLog("Stalin thinks you run a very nice town and gives you lots of money. +400 rubles!", "green");
        mainState.wallet = mainState.wallet + 400;
        this.setState({ wallet : mainState.wallet });
      }
    }

    mainState.vault += Math.floor(mainState.population * 1.95 * (mainState.unity + 5) / 100)

    this.setState({ vault : mainState.vault });

    this.saveToLog(Math.floor((mainState.population * 1.95 * (mainState.unity + 5)) / 100) + " newly taxed rubles adorn the floor of your vault.", "green");

    if (mainState.wallet >= 10) {
      mainState.wallet -= 10;
      this.setState({ wallet : mainState.wallet });
      this.saveToLog("10 rubles taken from your wallet to afford commodities.");
    } else {
      this.saveToLog("An inability to afford commodities makes you sad, reducing unity. -2% unity!", "red");
      mainState.unity -= 2;
      this.setState({ unity : mainState.unity });
    }

    this.askToLog("How many rubles to give per person? ", "blue", [0,1,2,3,4,5], (WagePP) => {
      mainState.vault -= WagePP * mainState.population;
      mainState.vault = Math.floor(mainState.vault);
      this.setState({ vault : mainState.vault });

      this.saveToLog("Distributed a total of " + Math.floor(WagePP * mainState.population) + " to the town.");

      if (WagePP === 0) {
        const msg = Math.round(Math.random() * 3);
        if (msg === 0) {
          this.saveToLog("What the?! You literally gave them nothing! -13% unity!", "red");
        } else if (msg === 1) {
          this.saveToLog("Um... Was that a typo? You didn't give them anything... -13% unity!", "red");
        } else if (msg === 2) {
          this.saveToLog("I guess you don't love them enough to give them even a ruble. -13% unity!", "red");
        } else {
          this.saveToLog("Well, I won't fight you on the decision not to give them anything. -13% unity!", "red");
        }
        mainState.unity -= 13;
        this.setState({ unity : mainState.unity });
      } else if (WagePP === 1) {
        this.saveToLog("You call this equality?! You're giving them less than 2 cents a pop! -9% unity!", "red");
        mainState.unity -= 9;
        this.setState({ unity : mainState.unity });
      } else if (WagePP === 2) {
        if (Math.round(Math.random() * 5) !== 0) {
          this.saveToLog("Your people didn't care that you payed them so little.", "green");
        } else {
          this.saveToLog("The commoners became angry and decided to steal from the vault. -" + Math.floor((mainState.vault * 5) / 100) + " rubles and -5% unity!", "red");
          mainState.unity -= 5;
          mainState.vault *= 95;
          mainState.vault /= 100;
          mainState.vault = Math.floor(mainState.vault);
          this.setState({ unity : mainState.unity });
          this.setState({ vault : mainState.vault });
        }
      } else if (WagePP === 3) {
        if (Math.round(Math.random() * 7) !== 0) {
          this.saveToLog("You payed your people little, but they got by.", "green");
        } else {
          this.saveToLog("Your people demanded more than this. -" + Math.floor((mainState.vault * 3) / 100) + " rubles and -4% unity!", "red");
          mainState.unity -= 4;
          mainState.vault *= 97;
          mainState.vault /= 100;
          mainState.vault = Math.floor(mainState.vault);
          this.setState({ unity : mainState.unity });
          this.setState({ vault : mainState.vault });
        }
      } else if (WagePP === 5) {
        this.saveToLog("You are giving the people what they want! +10% unity!", "green");
        if (mainState.unity + 10 <= 100) {
          mainState.unity += 10;
          this.setState({ unity : mainState.unity });
        } else if (mainState.unity < 100) {
          mainState.unity = 100
          this.setState({ unity : 100 });
        }
      } else {
        this.saveToLog("You payed your people an acceptable amount.", "green");
      }

      if (WagePP > 1) {
        mainState.population *= 9;
        mainState.population /= 8;
        mainState.population = Math.floor(mainState.population);
        this.setState({ population : mainState.population });
        this.saveToLog("Your town's population increased by a good amount.", "green");
      } else if (WagePP === 1) {
        this.saveToLog("Your town's population increased by a small amount.");
        mainState.population *= 13;
        mainState.population /= 12;
        mainState.population = Math.floor(mainState.population);
        this.setState({ population : mainState.population });
      } else {
        mainState.population *= 7;
        mainState.population /= 8;
        mainState.population = Math.floor(mainState.population);
        this.setState({ population : mainState.population });
        this.saveToLog("Your town's population decreased by a good (or bad, depends) amount.", "red");
      }

      this.askToLog("How many do you take for yourself? ", "blue", [0,10,50,100,400,600], (RublesTake) => {
        if (RublesTake > 0 && RublesTake <= mainState.vault) {
          mainState.vault -= RublesTake;
          mainState.wallet += RublesTake;
          this.setState({ vault : mainState.vault });
          this.setState({ wallet : mainState.wallet });
          this.saveToLog("You took " + RublesTake + " rubles.", "green");
        } else if (RublesTake === 0) {
          this.saveToLog("You didn't take any money.");
        } else if (RublesTake > mainState.vault) {
          this.saveToLog("You can't take more money than there is (duh). Your people think you're stupid. -10% unity!", "red");
          mainState.unity -= 10;
          this.setState({ unity : mainState.unity });
        }

        if (RublesTake < 50) {
          this.saveToLog("You took less than 50 rubles as income. The people like this. +3% unity!", "green");
          if (mainState.unity + 3 <= 100) {
            mainState.unity += 3;
            this.setState({ unity : mainState.unity });
          } else if (mainState.unity < 100) {
            mainState.unity = 100
            this.setState({ unity : 100 });
          }
        }

        if (mainState.vault < 0) {
          this.saveToLog(townname + " is in debt. The people don't like this, and beware of Stalin! -5% unity!", "red");
          mainState.unity -= 5;
          this.setState({ unity : mainState.unity });
        }

        if (mainState.wallet >= 3000) {
          this.askToLog("Do you want to finish the game?", "blue", ["Yes","No"], (Finish) => {
            if (Finish === "Yes") {
              if (mainState.unity <= 50) {
                this.saveToLog("Found a secret ending!", "yellow");
                this.askToLog("Your people chased you to the airport, but you managed to escape.", "green", ["Yay!"], (non) => {
                  this.finishGame();
                });
                return;
              } else if (mainState.wallet >= 100000) {
                this.saveToLog("Found a secret ending!", "yellow");
                this.askToLog("You decided to fly to America and buy a mansion with your endless riches.", "green", ["Yay!"], (non) => {
                  this.finishGame();
                });
                return;
              } else if (mainState.population >= 100000) {
                this.saveToLog("Found a secret ending!", "yellow");
                this.askToLog("You got your entire town to follow you on BaceFook; who needs to leave Russia?", "green", ["Yay!"], (non) => {
                  this.finishGame();
                });
                return;
              } else {
                this.askToLog("You escaped to Czechoslovakia somehow. It's a normal ending for a normal person.", "green", ["Yay!"], (non) => {
                  this.finishGame();
                });
                return;
              }
            } else {
              this.askToLog("Cool.", "yellow", ["Continue"], (non) => {
                mainState.quarter += 1;
                this.setState({ quarter : mainState.quarter });

                this.setState({ log : [] }, () => {this.main()});
              });
              return;
            }
          });
          return;
        }

        if (mainState.unity <= 50) {
          this.askToLog("Proceed to die.", "yellow", ["Proceed"], (nothing) => {

            this.askToLog("The people revolted! You were killed...", "red", ["Dang it."], (nothing) => {
              this.finishGame();
            });
          });
          return;
        }

        this.askToLog("Cool.", "yellow", ["Continue"], (non) => {
          mainState.quarter += 1;
          this.setState({ quarter : mainState.quarter });

          this.setState({ log : [] }, () => {this.main()});
        });

        return;
      });

      return;
    });

    return;
  }

  finishGame = () => {
    this.setState({ log : [] }, () => {
      this.saveToLog("Game finished!");
    });
  }

  saveToLog = (msg, color) => {
    const newLog = this.state.log;
    newLog[newLog.length] = [msg,color];

    this.setState({ log : newLog });
  }

  askToLog = (msg, color, options, functionWhenDone) => {
    const newLog = this.clone(this.state.log);
    newLog[newLog.length] = [msg,color,options,functionWhenDone];

    this.setState({ log : newLog });
  }

  clone(obj) {
    var copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj; type isn't supported.");
  }

  printLog = () => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const data = this.clone(this.state.log);
    const finalObjects = [];

    if (w < 1040) {
      //TODO: Draw everything as normal.
      //Then, at the bottom, instead of having buttons within a line,
      //Create a 2 by 3 table that will hold each button.

      for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
          data[i][1] = "LastPrint " + data[i][1];
        } else {
          data[i][1] = "NormPrint " + data[i][1];
        }

        let divClass = "FullWidthDiv";
        if (i % 2 === 0) {
          divClass = divClass + " lightBack";
        }

        if (data[i][2] === undefined) {
          finalObjects[i] = (
            <div className={divClass} key={i}>
              <p className={data[i][1]}>{data[i][0]}</p>
            </div>
          );
        } else {
          if (data[i][4] === undefined) {
            if (data[i][2].length > 3) {
              finalObjects[i] = (
                <React.Fragment>
                  <div className={divClass} key={i}>
                    <p className={data[i][1]}>{data[i][0]}</p>
                  </div>
                  <div className="MobBtnDiv">
                    <table>
                      {this.getLargeMobOptions(data[i][2])}
                    </table>
                  </div>
                </React.Fragment>
              );
            } else {
              finalObjects[i] = (
                <React.Fragment>
                  <div className={divClass} key={i}>
                    <p className={data[i][1]}>{data[i][0]}</p>
                  </div>
                  <div className="MobBtnDiv">
                    <table>
                      <tr>
                        {this.getMobOptions(data[i][2])}
                      </tr>
                    </table>
                  </div>
                </React.Fragment>
              );
            }
          } else {
            finalObjects[i] = (
              <div className={divClass} key={i}>
                <p className={data[i][1]}>{data[i][0]}</p>
                <div className="ButtonDiv">
                  <p className="ButtonChosen">{data[i][4]}</p>
                </div>
              </div>
            );
          }
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
          data[i][1] = "LastPrint " + data[i][1];
        } else {
          data[i][1] = "NormPrint " + data[i][1];
        }

        let divClass = "FullWidthDiv";
        if (i % 2 === 0) {
          divClass = divClass + " lightBack";
        }

        if (data[i][2] === undefined) {
          finalObjects[i] = (
            <div className={divClass} key={i}>
              <p className={data[i][1]}>{data[i][0]}</p>
            </div>
          );
        } else {
          if (data[i][4] === undefined) {
            finalObjects[i] = (
              <div className={divClass} key={i}>
                <p className={data[i][1]}>{data[i][0]}</p>
                <div className="ButtonDiv">
                  {this.getOptions(data[i][2])}
                </div>
              </div>
            );
          } else {
            finalObjects[i] = (
              <div className={divClass} key={i}>
                <p className={data[i][1]}>{data[i][0]}</p>
                <div className="ButtonDiv">
                  <p className="ButtonChosen">{data[i][4]}</p>
                </div>
              </div>
            );
          }
        }
      }
    }

    return <React.Fragment>{finalObjects}</React.Fragment>;
  }

  getOptions(options) {
    const optionsMapped = [];

    for (var i = 0; i < options.length; i++) {
      optionsMapped[i] = (
        <button className="btn" onClick={this.optionChosen} key={i} value={i}>{String(options[i])}</button>
      );
    }

    return <React.Fragment>{optionsMapped}</React.Fragment>;
  }

  getMobOptions(options) {
    const optionsMapped = [];

    for (var i = 0; i < options.length; i++) {
      optionsMapped[i] = (
        <td><button className="btn" onClick={this.optionChosen} key={i} value={i}>{String(options[i])}</button></td>
      );
    }

    return <React.Fragment>{optionsMapped}</React.Fragment>;
  }

  getLargeMobOptions(options) {
    const optionsMapped = [];

    for (var i = 0; i < options.length; i++) {
      optionsMapped[i] = (
        <td><button className="btn" onClick={this.optionChosen} key={i} value={i}>{String(options[i])}</button></td>
      );
    }

    return <React.Fragment><tr>{optionsMapped.splice(0,3)}</tr><tr>{optionsMapped}</tr></React.Fragment>;
  }

  optionChosen = (option) => {
    const newLog = this.clone(this.state.log);
    const val = option.target.value;
    newLog[newLog.length - 1][4] = newLog[newLog.length - 1][2][val];

    this.setState({ log : newLog }, () => {
      var optionsFunc = newLog[newLog.length - 1][3];
      optionsFunc(newLog[newLog.length - 1][2][val]);
    });
  }
}

export default App;
