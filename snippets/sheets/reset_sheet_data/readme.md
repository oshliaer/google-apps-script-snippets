---
title: 'Reset a sheet'
date: '2021-06-23'
description: 'Resets the sheet/sheets data to its original state. Cleans the sheet(s)'
tags: ['sheets']
categories: ['snippets']
images: ['./snippets/sheets/reset_sheet_data/screenshot.png']
---

## Resets the sheet/sheets data to its original state. Cleans the sheet(s)

{{< toc >}}

<video controls width="100%" height="350px" autoplay="true" loop="true">
    <source src="./screenrecord.mp4"  type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

### Snippet

- {{< externalLink >}}
- {{< commentLink >}}
- {{< scrvizLink >}}

{{< codeFromFile "index.js" >}}

### Run it

Copy the full sample of the Spreadsheet [Reset sheet data](https://docs.google.com/spreadsheets/d/1g8cCxofljFhq_J72sT5tvZZbeMTD5Wc8akHeXetCeDw/edit?usp=sharing).

You have to decide how you want to reset your sheet. This is expressed in individual user actions.

{{< codeFromFile "userActions.js" >}}

### Additional

{{< codeFromFile "triggerActions.js" >}}

#### Make copy before reset

<video controls width="100%" height="350px" autoplay="true" loop="true">
    <source src="./screenrecord2.mp4"  type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

{{< codeFromFile "makeCopyBeforeReset.js" >}}

{{< clipboard >}}
