-- CreateTable
CREATE TABLE "Post" (
    "in" SERIAL NOT NULL,
    "titile" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("in")
);
