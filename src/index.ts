import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command, EnmitySectionID } from "enmity-api/commands";
import { Plugin, registerPlugin } from "enmity-api/plugins";

const mockify: Plugin = {
  name: "mockify",
  commands: [],

  onStart() {
    const mock: Command = {
      id: "mock-command",
      applicationId: EnmitySectionID,

      name: "mock",
      displayName: "mock",

      description: "eXamPlE tExT",
      displayDescription: "eXamPlE tExT",

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
        const mockedText = text.split('').map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

        return {
          content: mockedText
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
