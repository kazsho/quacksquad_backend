const locationController = require('../../../controllers/location_controller');
const Location = require('../../../models/Location_model');

// Mock the Express response object ("`res`")
const mockSend = jest.fn();
const mockJSON = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJSON, end: mockEnd }));
const mockRes = { status: mockStatus };


describe('location controller', () => {

    beforeEach(() => jest.clearAllMocks())

    describe('index', () => {

        it("successully returns data for all locations, with status 200",
            async () => {
                // Arrange
                const mockData = ['location1', 'location2']
                jest.spyOn(Location, 'getAll').mockResolvedValueOnce(mockData)

                // Act
                await locationController.index(null, mockRes)

                // Assert
                expect(Location.getAll).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(200)
                expect(mockJSON).toHaveBeenCalledWith(mockData)
            }
        )
    })

    describe('show', () => {

        it("successfully returns data for a single location, with status 200",
            async () => {
                // Arrange 
                const mockReq = { params: { id: 1 } }
                const mockData = ['location1']
                jest.spyOn(Location, 'getOneById').mockResolvedValueOnce(mockData)

                // Act
                await locationController.show(mockReq, mockRes)

                // Assert
                expect(Location.getOneById).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(200)
                expect(mockJSON).toHaveBeenCalledWith(mockData)
            }
        )
    })
})