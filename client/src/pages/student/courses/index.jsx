import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { filterOptions, sortOptions } from "@/config"
import { StudentContext } from "@/context/student-context"
import { fetchStudentCourseListService } from "@/services"
import { ArrowUpDownIcon } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function StudentViewCoursePage() {

    const [sort, setSort] = useState('price-lowtohigh')
    const [filters, setFilters] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const { studentViewCoursesList,
        setStudentViewCoursesList

    } = useContext(StudentContext)

    async function fetchAllStudentViewCourses() {
        const response = await fetchStudentCourseListService()
        if (response?.success) {
            setStudentViewCoursesList(response?.data)
        }
    }


    useEffect(() => {
        fetchAllStudentViewCourses()

    }, [])


    function handleFilterOnChange(sectionId, getCurrentOption) {
        let cpyFilters = { ...filters }
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(sectionId)

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [sectionId]: [getCurrentOption.id]
            }
            console.log('cpyFilters', cpyFilters)
        }

        else {
            const indexOfCurrentOption = cpyFilters[sectionId].indexOf(getCurrentOption.id)

            if (indexOfCurrentOption === -1) {
                cpyFilters[sectionId].push(getCurrentOption.id)
            }
            else {
                cpyFilters[sectionId].splice(indexOfCurrentOption, 1)
            }



        }
        setFilters(cpyFilters)
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
    }

    function createSearchParamsHeler(filterParams){
        const queryParams = []

    }

    useEffect(() => {
        const buildQueryStringForFilters = createSearchParamsHeler(filters)
        setSearchParams(new URLSearchParams(buildQueryStringForFilters))
    }, [filters])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">All Courses</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4">
                    <div className="p-4 space-y-4">
                        {/* filters */}
                        {
                            Object.keys(filterOptions).map(keyItem => (
                                <div className="space-y-4">
                                    <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                                    <div className="p-4 grid gap-2 mt-2">
                                        {
                                            filterOptions[keyItem].map(option => (
                                                <Label className="flex font-medium items-center gap-3">
                                                    <Checkbox
                                                        checked={
                                                            filters && 
                                                            Object.keys(filters).length > 0 && 
                                                            filters[keyItem] && 
                                                            filters[keyItem].indexOf(option.id) !== -1 
                                                        }
                                                        onCheckedChange={() => handleFilterOnChange(keyItem, option)}


                                                    />
                                                    {option.label}

                                                </Label>
                                            ))
                                        }
                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </aside>
                <main className="flex-1">
                    <div className="flex justify-end items-center mb-4 gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 p-5">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span className="text-[16px] font-medium">Sort by</span>
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                                    {
                                        sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>)
                                    }

                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>

                        </DropdownMenu>
                        <span className="text-sm text-black font-bold">10 Results</span>
                    </div>

                    <div className="space-y-4 ">
                        {


                            studentViewCoursesList && studentViewCoursesList.length > 0 ?
                                studentViewCoursesList.map(courseItem => (
                                    <Card key={courseItem._id} className="cursor-pointer">
                                        <CardContent className="flex gap-4 p-4" >
                                            <div className="w-48 h-32 flex-shrink-0">
                                                <img
                                                    src={courseItem?.image}
                                                    className="w-full h-full object-cover"
                                                />

                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2">
                                                    {courseItem?.title}
                                                </CardTitle>
                                                <p className="text-sm text-gray-600 mb-1"> Created by <span className="font-bold">{courseItem?.instructorName}</span> </p>
                                                <p className="text-[16px] text-gray-700 mb-2">
                                                    {
                                                        `${courseItem?.curiculum?.length} ${courseItem?.curiculum?.length <= 1 ? 'Lecture' : 'Lectures'} - ${courseItem?.level.toUpperCase()} level`
                                                    }
                                                </p>
                                                <p className="font-bold text-lg">Rs.{courseItem?.pricing}</p>
                                            </div>

                                        </CardContent>
                                    </Card>

                                )) :

                                <h1>No Courses Found</h1>
                        }
                    </div>

                </main>
            </div>

        </div>
    )
}

export default StudentViewCoursePage