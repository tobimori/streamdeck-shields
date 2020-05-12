All API access is over HTTPS, and accessed from https://streamdeck.api.moeritz.io.

# Shields.io Endpoint

Just embed an image like this in your README.md file or somewhere else:

```
https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/shields/downloads/:pluginId/&...
```

Replace `:pluginId` with the plugin identifier, e.g. `de.tobimori.streamdeck.ifttt` 

In Markdown this would look like this:
```
![](https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/shields/downloads/:pluginId/&...)
```

In my example, this would return this:
![](https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/shields/downloads/de.tobimori.streamdeck.ifttt/)