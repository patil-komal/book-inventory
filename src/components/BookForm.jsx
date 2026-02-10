import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, getBook, updateBook } from "../services/api";
import { useEffect, useState } from "react";

export default function BookForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publisher: "",
      publishedDate: "",
      overview: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      publisher: Yup.string().required("Publisher is required"),
      publishedDate: Yup.date().required("Published date is required"),
      overview: Yup.string().required("Overview is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const payload = {
          title: values.title,
          author: values.author,
          publisher: values.publisher,
          published_date: values.publishedDate,
          overview: values.overview,
        };

        if (id) {
          await updateBook(id, payload);
        } else {
          await addBook(payload);
        }

        navigate("/");
      } catch (err) {
        console.error("Submit Error:", err);
        alert("Something went wrong while adding/updating book");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await getBook(id);
          formik.setValues({
            title: res.data.title,
            author: res.data.author,
            publisher: res.data.publisher,
            publishedDate: res.data.published_date || "",
            overview: res.data.overview,
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [id]);

  return (
    <div className="form-container">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} />
          {formik.touched.title && formik.errors.title && <p>{formik.errors.title}</p>}
        </div>

        <div>
          <label>Author</label>
          <input type="text" name="author" onChange={formik.handleChange} value={formik.values.author} />
          {formik.touched.author && formik.errors.author && <p>{formik.errors.author}</p>}
        </div>

        <div>
          <label>Publisher</label>
          <input type="text" name="publisher" onChange={formik.handleChange} value={formik.values.publisher} />
          {formik.touched.publisher && formik.errors.publisher && <p>{formik.errors.publisher}</p>}
        </div>

        <div>
          <label>Published Date</label>
          <input type="date" name="publishedDate" onChange={formik.handleChange} value={formik.values.publishedDate} />
          {formik.touched.publishedDate && formik.errors.publishedDate && <p>{formik.errors.publishedDate}</p>}
        </div>

        <div>
          <label>Overview</label>
          <textarea name="overview" onChange={formik.handleChange} value={formik.values.overview} />
          {formik.touched.overview && formik.errors.overview && <p>{formik.errors.overview}</p>}
        </div>

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
