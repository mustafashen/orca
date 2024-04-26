export type PositionReport = {
  Message: {
    PositionReport: {
      Cog: number;
      CommunicationState: number;
      Latitude: number;
      Longitude: number;
      MessageID: number;
      NavigationalStatus: number;
      PositionAccuracy: boolean;
      Raim: boolean;
      RateOfTurn: number;
      RepeatIndicator: number;
      Sog: number;
      Spare: number;
      SpecialManoeuvreIndicator: number;
      Timestamp: number;
      TrueHeading: number;
      UserID: number;
      Valid: true;
    };
  };
  MessageType: "PositionReport";
  MetaData: {
    MMSI: number;
    ShipName: string;
    latitude: number;
    longitude: number;
    time_utc: string;
  };
};
