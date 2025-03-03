import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_autologout extension.
 */

// Get the config file for the timeout plugin
// The time is in seconds
import config from './logout_conf.json'

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_autologout:plugin',
  description: 'Redirects to /hub/logout when inactive',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_autologout is activated!');

    console.log('jupyterlab_autologout: Config data is activated! ', config);
    
    /* We get the number after magic string so we can allow for
       configurations in the module, even if it means being very
       hacky about it.
       tried: reading from file but there are concerns about doing this outside of static
              tried reading from process.env.<ENV> but they are not exposed
              so this is a quick and dirty hack for the extension.          
    */

    var logout_time = Number(config.logout_time.split("_")[2])

    // this works since underscores are not allowed in domain names per RFC 1035
    var ignored_url = config.ignored_url.split('_')[2].toString()
    var timeoutInMiliseconds = logout_time * 1000; // Convert in miliseconds

    /**
     * TODO:
     *  extend the config: 
      {
        "logout_time": "logout_time_3600",
        "logout_url": "logout_url_/hub/logout",
        "ignored_url": "ignored_url_jupyter-url.example.com"
      }
      var logout_url = config.logout_url.split('_')[2].toString() // for jupyterlab vanilla '/logout'

      Also Re-Work the substitution to use the keys for the JSON String.
      They are no longer compiled by webpack.

      TO Rework that, I'll no longer need the fancy splitting on magic strings.
     */

    var timeoutId: number;
    var lastTrigeredTime = 0;

    function startTimer() {
      console.log("[autologout] start timer set at ", Date.now(), " with timeoutInMilliseconds set to ", timeoutInMiliseconds);
      timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
    }

    function resetTimer() {
      // Timer reset every 10 seconds on event trigered
      if (Date.now() - lastTrigeredTime > 10000) {
        console.log("[autologout] logout timer reset at ", Date.now());
        lastTrigeredTime = Date.now();
        window.clearTimeout(timeoutId);
        startTimer();
      }
    }

    function doInactive() {
      // this redirect isn't working and I have no idea why...
      // I need to see if the timeouts are really working or not.
      console.log("[autologout] logout trigered due to user inactivity");
      window.location.href = "/hub/logout";
    }

    function setupTimers () {
      document.addEventListener("mousemove", resetTimer);
      document.addEventListener("mousedown", resetTimer);
      document.addEventListener("keypress", resetTimer);
      document.addEventListener("touchmove", resetTimer);

      startTimer();
    }
    console.log("[autologout] the URL of this page is: " + window.location.href);

    var link = window.location.href;
    var is_ignored = link.includes(ignored_url);
    if (!is_ignored || (ignored_url === "")) {
      console.log("[autologout] setup timer");
      setupTimers();
    } else {
      console.log("[autologout] extension ignored for current host")
    }
    
  }
};

export default plugin;
