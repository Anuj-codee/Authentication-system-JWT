import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Session will automatically be removed after 7 days
    },
    revoked: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


const Session = mongoose.model('Session', sessionSchema);

export default Session;
