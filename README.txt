HWBot 
by Ulrich Barnstedt

Open source discord bot for the mangement of homework, displyed in a predefined format.
This bot runs over discord.

-----------------------------------------------------

Setup

To setup:
1. Download zip of this repository.
2. Edit config.json to match data. (More on this later)
3. Execute run.bat to run the bot.

-----------------------------------------------------

File info

Relevant files in the repository are:

- main.js 
  This file contains all of the code for the project.
  
- config.json
  This file contains the configuration of the bot, with "id" being the message at which the bot posts the data, "channelID" being the     dicsord channel in which this message is located, and "token" being the token for tehe bot. These need to be changed to fit your         data if you want to use the bot.
  
- hw.json
  This file contains all the current homework that has been entered into the bot.
  
- start.bat
  This file contains the command to start the bot.
 
-----------------------------------------------------

Things to note about the bot:

The bot has one currently known limitation that may be fixed in the future, but nothing is guaranteed.
This is the limitation that the bot has to be used daily for the data to stay correct.
The problem here is that the coding is made in a way that it only deletes events that end on that day.
So if an event ended yesterday, it will still not get deleted.

Anoter small thing to note is that this bot is not really made for being permanently online - its made that you just run the file eveytime you need it. There would be no benifits of running it all the time, as I have not implemented such features as deleting entries upon that date occuring as in comparions to the current method of whenever it gets updated.

The bot is now generally open source, but you may not use the code without giving credit.
If you modify it, you must note as so, and note that the original idea comes from me.

Oh and also, the bot may error upon startup, in which case the best idea is to just restart it.
If it happens multiple time, your bot token is probably invalid.

-----------------------------------------------------

Using the bot

The bot is relativly easy to use, as it just has a text based input.
This input has 4 options:

- a
  This is for inputting the data into the bot. It will ask the use several question on what the data should be, and then append it to     the database. Note: this does not save the data to the file.
  
- d
  Sends the new data to discord, and also saves the bot data to the file, meaning the bot can afterwards safely be closed.

- e
  List the elements in the array and gives the option to delete a specific one. Index of the array starts at 0.
  This method is not recommended though, it may bug sometimes.
  
- l
  This will list the contents of all the items in the database.
