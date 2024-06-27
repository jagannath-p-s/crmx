-- database.sql

-- Categories Table
CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Subcategories Table
CREATE TABLE public.subcategories (
    subcategory_id SERIAL PRIMARY KEY,
    subcategory_name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES public.categories(category_id)
);

-- Products Table
CREATE TABLE public.products (
    product_id SERIAL PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES public.categories(category_id),
    subcategory_id INTEGER REFERENCES public.subcategories(subcategory_id),
    price NUMERIC(10, 2) NOT NULL,
    min_stock INTEGER NOT NULL,
    max_stock INTEGER NOT NULL,
    current_stock INTEGER NOT NULL DEFAULT 0
);

-- Products View
CREATE VIEW public.products_view AS
SELECT
    p.product_id,
    p.product_code,
    p.product_name,
    c.category_name,
    s.subcategory_name,
    p.price,
    p.min_stock,
    p.max_stock
FROM
    products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN subcategories s ON p.subcategory_id = s.subcategory_id;

-- Users Table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    useremail VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mobile_number VARCHAR(50),
    address VARCHAR(255),
    phone_number VARCHAR(50)
);

-- Uploaded Files Table
CREATE TABLE public.uploaded_files (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_by INTEGER NOT NULL REFERENCES public.users(id),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    staff_access BOOLEAN DEFAULT FALSE,
    manager_access BOOLEAN DEFAULT FALSE,
    service_access BOOLEAN DEFAULT FALSE
);

-- Uploaded Files View
CREATE VIEW public.uploaded_files_view AS
SELECT
    uf.file_id,
    uf.file_name,
    uf.file_path,
    uf.uploaded_by,
    uf.upload_date,
    uf.staff_access,
    uf.manager_access,
    uf.service_access,
    u.username AS uploaded_by_username,
    u.useremail AS uploaded_by_email
FROM
    uploaded_files uf
    JOIN users u ON uf.uploaded_by = u.id;

-- Pipelines Table
CREATE TABLE public.pipelines (
    pipeline_id SERIAL PRIMARY KEY,
    pipeline_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stages Table
CREATE TABLE public.stages (
    stage_id SERIAL PRIMARY KEY,
    pipeline_id INTEGER REFERENCES public.pipelines(pipeline_id),
    stage_name VARCHAR(255) NOT NULL,
    stage_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stage Fields Table
CREATE TABLE public.stage_fields (
    field_id SERIAL PRIMARY KEY,
    stage_id INTEGER REFERENCES public.stages(stage_id),
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL, -- 'text', 'number', 'file', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE public.contacts (
    contact_id SERIAL PRIMARY KEY,
    customer_code VARCHAR(50) UNIQUE NOT NULL,
    pipeline_id INTEGER REFERENCES public.pipelines(pipeline_id),
    current_stage_id INTEGER REFERENCES public.stages(stage_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Products Table
CREATE TABLE public.contact_products (
    contact_product_id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES public.contacts(contact_id),
    product_id INTEGER REFERENCES public.products(product_id),
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Stage History Table
CREATE TABLE public.contact_stage_history (
    history_id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES public.contacts(contact_id),
    stage_id INTEGER REFERENCES public.stages(stage_id),
    user_id INTEGER REFERENCES public.users(id),
    remark TEXT,
    transition_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Flow Table
CREATE TABLE public.user_flow (
    flow_id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES public.contacts(contact_id),
    flow_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Points Table
CREATE TABLE public.user_points (
    point_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id),
    points INTEGER NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Total Points View
CREATE VIEW public.user_total_points AS
SELECT 
    user_id,
    SUM(points) as total_points
FROM 
    public.user_points
GROUP BY 
    user_id;

-- Function to calculate monthly performance
CREATE OR REPLACE FUNCTION get_monthly_performance(start_date DATE, end_date DATE)
RETURNS TABLE (
    user_id INTEGER,
    month DATE,
    monthly_points INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.user_id,
        DATE_TRUNC('month', up.created_at)::DATE as month,
        SUM(up.points) as monthly_points
    FROM 
        public.user_points up
    WHERE 
        up.created_at >= start_date AND up.created_at < end_date
    GROUP BY 
        up.user_id, DATE_TRUNC('month', up.created_at)
    ORDER BY 
        up.user_id, month;
END;
$$ LANGUAGE plpgsql;

-- Comments on tables and their purposes

COMMENT ON TABLE public.categories IS 'Stores product categories';
COMMENT ON TABLE public.subcategories IS 'Stores product subcategories, linked to categories';
COMMENT ON TABLE public.products IS 'Stores product information';
COMMENT ON TABLE public.users IS 'Stores user information and credentials';
COMMENT ON TABLE public.uploaded_files IS 'Stores information about uploaded files';
COMMENT ON TABLE public.pipelines IS 'Stores different sales pipelines';
COMMENT ON TABLE public.stages IS 'Stores stages for each pipeline';
COMMENT ON TABLE public.stage_fields IS 'Stores custom fields for each stage';
COMMENT ON TABLE public.contacts IS 'Stores contact information and their current stage in a pipeline';
COMMENT ON TABLE public.contact_products IS 'Links contacts with the products they are interested in';
COMMENT ON TABLE public.contact_stage_history IS 'Tracks the history of stage transitions for each contact';
COMMENT ON TABLE public.user_flow IS 'Stores the user flow codes for each contact';
COMMENT ON TABLE public.user_points IS 'Tracks points earned by users';

COMMENT ON VIEW public.products_view IS 'Provides a detailed view of products with category and subcategory names';
COMMENT ON VIEW public.uploaded_files_view IS 'Provides a detailed view of uploaded files with uploader information';
COMMENT ON VIEW public.user_total_points IS 'Calculates the total points for each user';

COMMENT ON FUNCTION get_monthly_performance IS 'Calculates monthly performance for users within a given date range';