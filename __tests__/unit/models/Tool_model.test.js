const Tool = require('../../../models/Tool_model')
const db = require("../../../database/connect")


describe('Tool model', () => {

    beforeEach(() => jest.clearAllMocks())

    describe('getAll', () => {

        it("should return all tools in the database, as new `Tool` instances",
            async () => {
                // Arrange
                const mockData = [
                    {
                        tool_name: 'tool1',
                        tool_id: 1,
                        location_id: 1,
                        price_per_day: 1.00,
                        description: 'description1',
                        image_URL: 'image1',
                        status: 'available'
                    },
                    {
                        tool_name: 'tool2',
                        tool_id: 2,
                        location_id: 2,
                        price_per_day: 2.00,
                        description: 'description2',
                        image_URL: 'image2',
                        status: 'unavailable'
                    }
                ]
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockData })

                // Act
                const result = await Tool.getAll()

                // Assert
                expect(result).toEqual([
                    new Tool(mockData[0]),
                    new Tool(mockData[1])
                ])
                expect(db.query).toHaveBeenCalledTimes(1)
            }
        )
    })

    describe('getOneById', () => {

        it("should return a single tool, as a new `Tool` instance",
            async () => {
                // Arrange
                const mockData = {
                    tool_name: 'tool1',
                    tool_id: 1,
                    location_id: 1,
                    price_per_day: 1.00,
                    description: 'description1',
                    image_URL: 'image1',
                    status: 'available'
                }
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockData] })

                // Act
                const result = await Tool.getOneById(1)

                // Assert
                expect(result).toEqual(new Tool(mockData))
                expect(db.query).toHaveBeenCalledTimes(1)
                expect(db.query).toHaveBeenCalledWith("SELECT * FROM tool WHERE tool_id = $1", [1])
            }
        )
    })

    describe('create', () => {

        it("should return a new `Tool` instance, when valid data is provided",
            async () => {
                // Arrange
                const mockData = {
                    tool_name: 'tool1',
                    location_id: 1,
                    price_per_day: 1.00,
                    description: 'description1',
                    image_URL: 'image1',
                    status: 'available'
                }
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockData] })

                // Act
                const result = await Tool.create(mockData)

                // Assert
                expect(result).toEqual(new Tool(mockData))
                expect(db.query).toHaveBeenCalledTimes(1)
                expect(db.query).toHaveBeenCalledWith(
                    "INSERT INTO tool (tool_name, location_id, price_per_day, description, image_URL, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
                    ['tool1', 1, 1.00, 'description1', 'image1', 'available']
                )

            }
        )
    })

    describe('update', () => {

        it("should return an updated `Tool` instance, when a valid id is provided",
            async () => {
                // Arrange
                const mockExistingData = {
                    too_id: 1
                }
                const mockUpdateData = {
                    tool_name: 'tool1',
                    location_id: 1,
                    price_per_day: 1.00,
                    description: 'description1',
                    image_URL: 'image1',
                    status: 'available'
                }
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockExistingData] })
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUpdateData] })

                // Act
                const result = await Tool.update(1, mockUpdateData)

                // Assert
                expect(result).toEqual(new Tool(mockUpdateData))
                expect(db.query).toHaveBeenCalledTimes(2)
                expect(db.query).toHaveBeenCalledWith(
                    "UPDATE tool SET tool_name = $1, location_id = $2, price_per_day = $3, description = $4, image_URL = $5, status = $6 WHERE tool_id = $7 RETURNING *;",
                    ['tool1', 1, 1.00, 'description1', 'image1', 'available', 1]
                )

            }
        )
    })

    describe('destroy', () => {

        it("should return a deleted `Tool` instance, when a valid id is provided",
            async () => {
                // Arrange
                const mockData = {
                    tool_name: 'tool1',
                    tool_id: 1,
                    location_id: 1,
                    price_per_day: 1.00,
                    description: 'description1',
                    image_URL: 'image1',
                    status: 'available'
                }
                jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockData] })

                // Act
                const result = await Tool.destroy(1)

                // Assert
                expect(result).toEqual(new Tool(mockData))
                expect(db.query).toHaveBeenCalledTimes(1)
                expect(db.query).toHaveBeenCalledWith("DELETE FROM tool WHERE tool_id = $1 RETURNING *;", [1])
            }
        )
    })

})