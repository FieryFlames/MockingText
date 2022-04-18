import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command, EnmitySectionID } from "enmity-api/commands";
import { Plugin, registerPlugin } from "enmity-api/plugins";

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function mock_(str) {
  var lastChar = false;
  const chars = str.split('');
  var mocked = "";

  for (let i = 0; i < str.length; i++) {
    if (isLetter(chars[i])) {
      if (!lastChar) {
        mocked += chars[i].toUpperCase();
        lastChar = !lastChar
      } else {
        mocked += chars[i].toLowerCase();
        lastChar = !lastChar
      }
    } else {
      mocked += chars[i]
    }
  }
  
  return mocked
}

const mockify: Plugin = {
  name: "mockify",
  commands: [],

  onStart() {
    const mock: Command = {
      id: "mock-command",
      applicationId: EnmitySectionID,

      name: "mock",
      displayName: "mock",

      description: "eXaMpLe TeXt",
      displayDescription: "eXaMpLe TeXt",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

      options: [{
        name: "text",
        displayName: "text",

        description: "Text to mock",
        displayDescription: "Text to mock",

        type: ApplicationCommandOptionType.String,
        required: true
      }],

      execute: function (args, message) {
        const text = args[0].value;
        return {
          content: mock_(text)
        }
      }
    }
    
    this.commands.push(mock);
  },

  onStop() {
    this.commands = [];
  }
}

registerPlugin(mockify);
