const toolController = require('../../../controllers/tool_controller')
const Tool = require('../../../models/Tool_model')

// Mock the Express response object ("`res`")
const mockSend = jest.fn()
const mockJSON = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJSON, end: mockEnd }))
const mockRes = { status: mockStatus }


describe('tool controller', () => {

    beforeEach(() => jest.clearAllMocks())

    describe('index', () => {

        it("successully returns data for all tools, with status 200",
            async () => {
                // Arrange
                const mockData = ['tool1', 'tool2']
                jest.spyOn(Tool, 'getAll').mockResolvedValueOnce(mockData)

                // Act
                await toolController.index(null, mockRes)

                // Assert
                expect(Tool.getAll).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(200)
                expect(mockJSON).toHaveBeenCalledWith(mockData)
            }
        )
    })

    describe('show', () => {

        it("successfully returns data for a single tool, with status 200",
            async () => {
                // Arrange 
                const mockReq = { params: { id: 1 } }
                const mockData = ['tool1']
                jest.spyOn(Tool, 'getOneById').mockResolvedValueOnce(mockData)

                // Act
                await toolController.show(mockReq, mockRes)

                // Assert
                expect(Tool.getOneById).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(200)
                expect(mockJSON).toHaveBeenCalledWith(mockData)
            }
        )

    })

    describe('create', () => {

        it("successfully returns a created tool, with status 201, when full data is provided",
            async () => {
                // Arrange
                const mockData = {
                    tool_name: "duck",
                    location_id: 1,
                    price_per_day: '2.00',
                    description: "A playful bathtime friend",
                    image_url: "http://example.com/duck-image.jpg",
                    status: "available"
                }
                const mockReq = { body: mockData }
                jest.spyOn(Tool, 'create').mockResolvedValueOnce(new Tool(mockData))

                // Act
                await toolController.create(mockReq, mockRes)

                // Assert 
                expect(Tool.create).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(201)
                expect(mockJSON).toHaveBeenCalledWith(new Tool(mockData))
            }
        )

    })

    describe('update', () => {

        it("successfully returns an updated tool, with status 200, when full data is provided",
            async () => {
                // Arrange
                const mockData = {
                    tool_name: "hardcore hammer",
                    location_id: 2,
                    price_per_day: '4.50',
                    description: "A dubious implement for unspoken deeds.",
                    image_url: "http://example.com/hammer.jpg",
                    status: 'unavailable'
                }
                const mockReq = { params: { id: 2 }, body: mockData }
                jest.spyOn(Tool, 'update').mockResolvedValueOnce(new Tool(mockData))

                // Act
                await toolController.update(mockReq, mockRes)

                // Assert
                expect(Tool.update).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(200)
                expect(mockJSON).toHaveBeenCalledWith(new Tool(mockData))
            }
        )
    })

    describe('destroy', () => {

        it("successfully returns status 204, and nothing else, when id is provided",
            async () => {
                // Arrange 
                const mockReq = { params: { id: 3 } }
                const mockData = 'tool3'
                jest.spyOn(Tool, 'destroy').mockResolvedValueOnce(mockData)

                // Act
                await toolController.destroy(mockReq, mockRes)

                // Assert
                expect(Tool.destroy).toHaveBeenCalledTimes(1)
                expect(mockStatus).toHaveBeenCalledWith(204)
                expect(mockEnd).toHaveBeenCalled()
                expect(mockSend).not.toHaveBeenCalled()
                expect(mockJSON).not.toHaveBeenCalled()
            }
        )


    })

})