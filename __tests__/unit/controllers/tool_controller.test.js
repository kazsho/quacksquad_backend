const toolController = require('../../../controllers/tool_controller')
const Tool = require('../../../models/Tool_model')

const mockSend = jest.fn()
const mockJSON = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJSON, end: mockEnd }))
const mockRes = { status: mockStatus }


describe('tool controller', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('index', () => {

        it("should successully return data for all tools",
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




})