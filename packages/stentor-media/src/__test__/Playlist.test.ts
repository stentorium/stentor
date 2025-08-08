/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { Playable, Scheduled, Song } from "stentor-models";
import { expect } from "chai";
import * as sinon from "sinon";
import { SONG } from "../Constants";
import { Playlist } from "../Playlist";

const song1: Song = {
  type: SONG,
  title: "title1",
  id: "id1",
  token: "token1",
  url: "https://some.playlist.song.url",
  length: 40000,
};
const song2: Song = {
  type: SONG,
  title: "title2",
  id: "id2",
  token: "token2",
  url: "https://another.playlist.song.url",
  length: 40000,
};
const song3: Song = {
  type: SONG,
  title: "title3",
  id: "id3",
  token: "token3",
  url: "https://yet.another.playlist.some.url",
  length: 40000,
};
const song4: Song = {
  type: SONG,
  title: "title4",
  id: "id4",
  token: "token4",
  url: "https://yes.four.url",
  length: 48288,
};

describe("Playlist", () => {
  const schedulableByDayThree: Scheduled<Playable> = {
    token: "token-first",
    url: "https://and.another.media.url",
    schedule: {
      start: {
        time: "0:00 -0500 3",
        format: "H:mm Z D",
      },
      duration: {
        amount: 24,
        format: "h",
      },
    },
  };

  const schedulableByDayFour: Scheduled<Playable> = {
    url: "https://another.url",
    token: "token-url",
    schedule: {
      start: {
        time: "0:00 -0500 4",
        format: "H:mm Z D",
      },
      duration: {
        amount: 24,
        format: "h",
      },
    },
  };

  const data: Song[] = [
    {
      type: "Song",
      title: "We Outta Be Drinkin'",
      id: "47784",
      token: "47784",
      url: "https://sr002.socialradio.org/songs/47784.mp3?t=axzkpEvhM32H",
      length: 4000,
    },
    {
      type: "Song",
      title: "21",
      id: "47566",
      token: "47566",
      url: "https://sr002.socialradio.org/songs/47566.mp3?t=hwGBQNdtk5le",
      length: 4000,
    },
    {
      type: "Song",
      title: "Take It Off",
      id: "29359",
      token: "29339",
      url: "https://sr002.socialradio.org/songs/29359.mp3?t=04uMf7fkHKA6",
      length: 4000,
    },
    {
      type: "Song",
      title: "When I've Been Drinkin'",
      id: "36181",
      token: "36181",
      url: "https://sr002.socialradio.org/songs/36181.mp3?t=A8NTndVfJWx3",
      length: 4000,
    },
    {
      type: "Song",
      title: "A Pirate Looks at Forty",
      id: "33899",
      token: "33899",
      url: "https://sr002.socialradio.org/songs/33899.mp3?t=KgZK566emutv",
      length: 4000,
    },
    {
      type: "Song",
      title: "Make This Day",
      id: "34023",
      token: "34023",
      url: "https://sr002.socialradio.org/songs/34023.mp3?t=jScPYS9G6KbR",
      length: 4000,
    },
  ];
  describe("constructor", () => {
    describe("without data", () => {
      it("creates an empty list", () => {
        const playlist = new Playlist();
        expect(playlist).to.have.length(0);
      });
    });
    describe("with data", () => {
      describe("using an array", () => {
        it("parses the songs", () => {
          const playlist = new Playlist(data);
          expect(playlist).to.have.length(6);
        });
      });
      describe("using Playlist as the data", () => {
        let playlist: Playlist;
        beforeEach(() => {
          const playlistAsData = new Playlist(data);
          playlistAsData.name = "Hello World";
          playlist = new Playlist(playlistAsData);
        });
        it("parses the songs", () => {
          expect(playlist).to.have.length(6);
        });
        it("sets the name", () => {
          expect(playlist.name).to.equal("Hello World");
        });
      });
      describe("using playlist props", () => {
        it("parses the songs", () => {
          const playlist = new Playlist({
            ["0"]: song1,
            [1]: song2,
          });
          expect(playlist).to.have.length(2);
          expect(playlist[0]).to.deep.equal(song1);
          expect(playlist[1]).to.deep.equal(song2);
        });
        it("parses the name", () => {
          const playlist = new Playlist({
            name: "Hello!",
            ["0"]: song1,
            [1]: song2,
          });
          expect(playlist).to.have.length(2);
          expect(playlist[0]).to.deep.equal(song1);
          expect(playlist[1]).to.deep.equal(song2);
          expect(playlist.name).to.equal("Hello!");
        });
      });
    });
  });
  describe("JSON.parse()", () => {
    let json: any;
    beforeEach(() => {
      const playlist = new Playlist();
      playlist.push(song1);
      const playlistString = JSON.stringify(playlist);
      json = JSON.parse(playlistString);
    });
    it("returns an array with correct length", () => {
      expect(json).to.exist;
      expect(json[0]).to.exist;
      expect(json[1]).to.be.undefined;
    });
    it("parse the audio in the playlist", () => {
      expect(json[0]).to.deep.equal(song1);
    });
    it("can be converted back to a Playlist", () => {
      const newPlaylist = new Playlist(json);
      expect(newPlaylist[0]).to.deep.equal(song1);
      expect(newPlaylist).to.have.length(1);
    });
    describe("with a name", () => {
      beforeEach(() => {
        const playlist = new Playlist();
        playlist.name = "Hello";
        playlist.push(song1);
        const playlistString = JSON.stringify(playlist);
        json = JSON.parse(playlistString);
      });
      it("returns an object with the name", () => {
        expect(json.name).to.equal("Hello");
      });
      it("returns an object with a 0 key", () => {
        expect(json[0]).to.deep.equal(song1);
      });
      it("can be converted back to a Playlist", () => {
        const newPlaylist = new Playlist(json);
        expect(newPlaylist.name).to.equal("Hello");
        expect(newPlaylist).to.have.length(1);
      });
    });
  });
  describe("[index]", () => {
    describe("set", () => {
      it("can set a specific index", () => {
        const playlist = new Playlist();
        playlist.push(song1);
        playlist.push(song2);
        // rewrite index 0
        playlist[0] = song3;
        expect(playlist).to.have.length(2);
        expect(playlist[0]).to.deep.equal(song3);
      });
    });
    describe("get", () => {
      it("can get a specific index", () => {
        const playlist = new Playlist();
        playlist.push(song1);
        playlist.push(song2);
        expect(playlist).to.have.length(2);
        expect(playlist[1]).to.equal(song2);
        expect(playlist[5]).to.be.undefined;
      });
      it("returns undefined for an empty playlist", () => {
        const playlist = new Playlist();
        expect(playlist[0]).to.be.undefined;
      });
    });
  });
  describe("#push()", () => {
    it("adds a song", () => {
      const playlist = new Playlist();
      playlist.push(song1);
      expect(playlist).to.have.length(1);
    });
  });
  describe("#indexOf()", () => {
    const playlist = new Playlist();
    playlist.push(song1);
    playlist.push(song2);
    it("returns the index of the song in the list", () => {
      expect(playlist.indexOf(song1)).to.equal(0);
    });
    it("returns the index of a song in the list when using the token", () => {
      expect(playlist.indexOf(song2.token)).to.equal(1);
    });
    it("returns -1 for a song not in the list", () => {
      expect(playlist.indexOf(song3)).to.equal(-1);
    });
    it("returns -1 for passing undefined", () => {
      expect(playlist.indexOf(undefined)).to.equal(-1);
    });
  });
  describe("#pop()", () => {
    const playlist = new Playlist();
    playlist.push(song1);
    playlist.push(song2);
    it("pops the last item", () => {
      expect(playlist.pop()).to.equal(song2);
    });
  });
  describe("#fill()", () => {
    const playlist = new Playlist();
    playlist.push(song1);
    playlist.push(song2);
    playlist.push(song3);
    it("fills the entire playlist with one song", () => {
      playlist.fill(song4);
      expect(playlist[0]).to.equal(song4);
      expect(playlist[1]).to.equal(song4);
      expect(playlist[2]).to.equal(song4);
    });
  });
  describe("#get()", () => {
    const playlist = new Playlist();
    playlist.push(song1);
    describe("with token", () => {
      it("returns the song if it is in the playlist", () => {
        expect(playlist.get(song1.token)).to.equal(song1);
      });
      it("returns undefined if not found", () => {
        expect(playlist.get("bad")).to.be.undefined;
      });
    });
    describe("with ID", () => {
      it("returns the song if it is in the playlist", () => {
        expect(playlist.get(song1.id)).to.equal(song1);
      });
    });
  });
  describe("#next()", () => {
    describe("on an empty list", () => {
      const playlist = new Playlist();
      it("returns undefined", () => {
        expect(playlist.next()).to.be.undefined;
      });
    });
    describe("on a list with one song", () => {
      const playlist = new Playlist();
      playlist.push(song1);
      it("returns the song when no song is provided", () => {
        expect(playlist.next()).to.equal(song1);
      });
      it("returns undefined when the only song is provided", () => {
        expect(playlist.next(song1)).to.be.undefined;
      });
    });
    describe("on a list with multiple songs", () => {
      const playlist = new Playlist();
      playlist.push(song1);
      playlist.push(song2);
      playlist.push(song3);
      it("returns the first song when no previous song is passed", () => {
        expect(playlist.next()).to.equal(song1);
      });
      it("returns the next song when a previous song is provided", () => {
        expect(playlist.next(song1)).to.equal(song2);
        expect(playlist.next(song1.token)).to.equal(song2);
      });
      it("returns undefined at the end of the playlist", () => {
        expect(playlist.next(song3)).to.be.undefined;
        expect(playlist.next(song3.token)).to.be.undefined;
      });
    });
    describe("on a list with schedulable media with a match", () => {
      let playlist: Playlist;
      const date = new Date("2017-03-03T19:40:00-05:00");
      let clock: sinon.SinonFakeTimers;

      beforeEach(() => {
        playlist = new Playlist();
        playlist.push(song1);
        playlist.push(song2);
        playlist.push(song3);
        playlist.push(schedulableByDayThree);
        playlist.push(schedulableByDayFour);
        clock = sinon.useFakeTimers(date.getTime());
      });
      afterEach(() => {
        clock.restore();
      });
      it("returns the correct scheduled media when no current media is passed", () => {
        expect(playlist.next()).to.equal(schedulableByDayThree);
      });
    });
    describe("on a list with schedulable media without a match", () => {
      let playlist: Playlist;
      // This test would fail on the fourth day of the month.....
      // Had to fake the time
      const date = new Date("2017-03-17T19:40:00-05:00");
      let clock: sinon.SinonFakeTimers;

      beforeEach(() => {
        playlist = new Playlist();
        playlist.push(song1);
        playlist.push(song2);
        playlist.push(song3);
        playlist.push(schedulableByDayThree);
        playlist.push(schedulableByDayFour);
        clock = sinon.useFakeTimers(date.getTime());
      });
      afterEach(() => {
        clock.restore();
      });
      // TODO: Why are there TWO beforeEach?
      beforeEach(() => {
        playlist = new Playlist();
        playlist.push(song1); // our default
        playlist.push(schedulableByDayThree);
        playlist.push(schedulableByDayFour);
      });
      it("returns the default when no current media is passed ", () => {
        expect(playlist.next()).to.equal(song1);
      });
    });
  });
  describe("#previous()", () => {
    describe("on an empty list", () => {
      const playlist = new Playlist();
      it("returns undefined", () => {
        expect(playlist.previous()).to.be.undefined;
      });
    });
    describe("on a list with one song", () => {
      const playlist = new Playlist();
      playlist.push(song1);
      it("returns the song when no song is provided", () => {
        expect(playlist.previous()).to.equal(song1);
      });
      it("returns undefined when the only song is provided", () => {
        expect(playlist.previous(song1)).to.be.undefined;
      });
    });
    describe("on a list with multiple songs", () => {
      const playlist = new Playlist();
      playlist.push(song1);
      playlist.push(song2);
      playlist.push(song3);
      it("returns the first song when no previous song is passed", () => {
        expect(playlist.previous()).to.equal(song1);
      });
      it("returns undefined when the first song is provided", () => {
        expect(playlist.previous(song1)).to.be.undefined;
        expect(playlist.previous(song1.token)).to.be.undefined;
      });
      it("returns the previous song for a song at the end of the playlist", () => {
        expect(playlist.previous(song3)).to.equal(song2);
        expect(playlist.previous(song3.token)).to.equal(song2);
      });
      it("returns the first song when the first song is provided", () => {
        expect(playlist.previous(song2)).to.equal(song1);
        expect(playlist.previous(song2.token)).to.equal(song1);
      });
    });
  });
});
