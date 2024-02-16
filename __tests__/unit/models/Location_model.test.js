const Location = require("../../../models/Location_model")
const db = require("../../../database/connect")


describe('Location model', () => {

    beforeEach(() => jest.clearAllMocks())

    describe('getAll', () => {

        it("should return all locations in the database, as new `Location` instances",
            async () => {
                // Arrange
                const mockData = [
                    {
                        location_id: 1,
                        street_address: '1234 Main St',
                        post_code: '12345'
                    },
                    {
                        location_id: 2,
                        street_address: '5678 Elm St',
                        post_code: '67890'
                    }
                ]
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockData })

                // Act
                const result = await Location.getAll()

                // Assert
                expect(result).toEqual([
                    new Location(mockData[0]),
                    new Location(mockData[1])
                ])
                expect(db.query).toHaveBeenCalledTimes(1)
            }
        )
    })

    describe('getOneById', () => {

        it("should return a single location, as a new `Location` instance",
            async () => {
                // Arrange
                const mockData = {
                    location_id: 1,
                    street_address: '1234 Main St',
                    post_code: '12345'
                }
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockData] })

                // Act
                const result = await Location.getOneById(1)

                // Assert
                expect(result).toEqual(new Location(mockData))
                expect(db.query).toHaveBeenCalledTimes(1)
            }
        )
    })
})