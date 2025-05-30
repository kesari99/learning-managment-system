import paypal from "../../helpers/paypal.js";
import {Order} from "../../models/Order.js";
import {StudentCourses} from "../../models/StudentCourses.js";
import {Course} from "../../models/Course.js";


export const createOrder = async (req, res) => {
    try{
        const {
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
        } = req.body

        const create_payment_json = {
            intent: 'sale',
            payer:{
                payment_method:'paypal',
            },
            redirect_urls:{
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url:`${process.env.CLIENT_URL}/payment-cancel`,

            },
            transactions: [
                {
                    item_list:{
                        items: [
                            {
                                name:courseTitle,
                                sku:courseId,
                                price:coursePricing,
                                currency:'USD',
                                quantity:1
                            }

                        ],
                    },
                    amount: {
                        currency:'USD',
                        total:coursePricing.toFixed(2),

                    },
                    description:courseTitle
                },



            ]
        }


        paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Error while creating papal payment",
                })
            }
            else{
                const newlyCreatedCourseOrder = new Order({
                    userId,
                    userName,
                    userEmail,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    paymentId,
                    payerId,
                    instructorId,
                    instructorName,
                    courseImage,
                    courseTitle,
                    courseId,
                    coursePricing,

                })

                await newlyCreatedCourseOrder.save()

                const approveUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href;

                res.status(201).json({
                    success: true,
                    data:{
                        approveUrl:approveUrl,
                        orderId: newlyCreatedCourseOrder._id
                    }
                })
            }
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export const capturePaymentAndFinalize = async (req, res) => {
    try{

        const {paymentId, payerId, orderId} = req.body

        let order = await Order.findById(orderId)

        if(!order){
            return res.status(404).json({
                success:false,
                message:"No Order with this ID"
            })
        }

        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        await order.save()

        //update Student Course Model
        const studentCourses = await StudentCourses.findOne({
            userId:order.userId
        })

        if(studentCourses){

            studentCourses.courses.push({
                courseId: order.courseId,
                title:order.courseTitle,
                instructorId:order.instructorId,
                instructorName: order.instructorName,
                dateOfPurchase:order.orderDate,
                courseImage: order.courseImage

            })

            await studentCourses.save()


        }
        else{
            const newStudentCourses = new StudentCourses({
                userId:order.userId,
                courses : [
                    {
                        courseId: order.courseId,
                        title:order.courseTitle,
                        instructorId:order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase:order.orderDate,
                        courseImage: order.courseImage


                    }
                ]
            })
            await newStudentCourses.save()


        }

        //update the course scheme course students

        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                studentId: order.userId,
                studentName:order.userName,
                studentEmail:order.userEmail,
                paidAmount:order.coursePricing,
            }
        })

        res.status(200).json({
            success:true,
            message:'Order Confimed',
            data:order
        })


    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}